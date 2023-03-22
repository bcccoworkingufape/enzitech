import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Env } from '../../shared/helpers/env.helper';
import { CreateUserDto } from '../../presentation/dtos/user/create-user.dto';
import { ListUserFilterDto } from '../../presentation/dtos/user/list-user-filter.dto';
import { ListUserDto } from '../../presentation/dtos/user/list-user.dto';
import { UpdateUserDto } from '../../presentation/dtos/user/update-user.dto';
import { UserRole } from '../../presentation/dtos/user/enums/user-role.enum';
import { User } from '../../domain/models/user.entity';
import {
  EmailAlreadyRegisteredException,
  UserNotFoundException,
} from '../../domain/exceptions/user.exception';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { UserDto } from '../../presentation/dtos/user/user.dto';


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    this.logger.debug('create');
    try {
      await this.findByEmail(data.email);
      throw new EmailAlreadyRegisteredException();
    } catch (ex) {
      if (!(ex instanceof UserNotFoundException)) {
        throw ex;
      }
    }

    const user = this.userRepository.create({
      name: data.name,
      passwordHash: await hash(data.password, Env.getNumber('SALT_ROUNDS')),
      email: data.email.toLowerCase(),
    });

    return this.userRepository.save(user);
  }

  async get(id: string): Promise<User> {
    this.logger.debug('get');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async list(filter: ListUserFilterDto): Promise<ListUserDto> {
    this.logger.debug('list');
    const { users, count } = await this.userRepository.list({
      email: filter.email,
      name: filter.name,
      role: filter.role,
      page: filter.page ?? 1,
      ordering: filter.ordering ?? 'ASC',
      orderBy: filter.orderBy,
      limit: filter.limit ?? 10,
      initialDate: filter.initialDate,
      finalDate: filter.finalDate,
    });
    return new ListUserDto({ users: users.map(u => new UserDto(u)), count });
  }


  async findBy(criteria: Partial<User>): Promise<User> {
    this.logger.debug('findBy');

    const user = await this.userRepository.findOne({ 
      where: criteria
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    this.logger.debug('findByEmail');
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    this.logger.debug('update');
    const user = await this.get(id);

    const updatedUser = new User({
      ...user,
      name: data.name ?? user.name,
      email: data.email ?? user.email,
      recoverToken: data.recoverToken,
      ...(data.password
        ? { passwordHash: await hash(data.password, Env.getNumber('SALT_ROUNDS')) }
        : {}),
    });

    return this.userRepository.save(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.debug('delete');
    return !!(await this.userRepository.delete(id)).affected;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    this.logger.debug('findByIds');
    return this.userRepository.findByIds(ids);
  }
}
