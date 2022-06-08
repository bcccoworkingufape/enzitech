import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Env } from '../../shared/helpers/env.helper';
import { CreateUserDto } from '../../presentation/dtos/user/create-user.dto';
import { ProcessRepository } from '@/infrastructure/database/repositories/process.repository';


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(ProcessRepository)
    private readonly processRepository: ProcessRepository,
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

  // async list(filter: ListUserFilterDto): Promise<ListUserDto> {
  //   this.logger.debug('list');
  //   const { users, count } = await this.userRepository.list({
  //     email: filter.email,
  //     name: filter.name,
  //     role: filter.role,
  //     page: filter.page ?? 1,
  //     ordering: filter.ordering ?? 'ASC',
  //     orderBy: filter.orderBy,
  //     limit: filter.limit ?? 10,
  //     initialDate: filter.initialDate,
  //     finalDate: filter.finalDate,
  //   });
  //   return new ListUserDto({ users: users.map(u => new UserDto(u)), count });
  // }

  async delete(id: string): Promise<boolean> {
    this.logger.debug('delete');
    return !!(await this.userRepository.delete(id)).affected;
  }

}
