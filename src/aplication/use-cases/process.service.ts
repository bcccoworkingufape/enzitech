import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessRepository } from '@/infrastructure/database/repositories/process.repository';
import { CreateProcessDto } from '@/presentation/dtos/process/create-process.dto';
import { Process } from '@/domain/models/process.entity';


@Injectable()
export class ProcessService {
  private readonly logger = new Logger(ProcessService.name);

  constructor(
    @InjectRepository(ProcessRepository)
    private readonly processRepository: ProcessRepository,
  ) {}

  async create(data: CreateProcessDto): Promise<Process> {
    this.logger.debug('create');
    try {
      const process = this.processRepository.create({...data});

      return this.processRepository.save(process);
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar tratamento');
      
    }
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
    return !!(await this.processRepository.delete(id)).affected;
  }

}
