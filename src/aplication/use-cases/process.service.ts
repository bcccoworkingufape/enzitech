import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';

import { ProcessRepository } from '@/infrastructure/database/repositories/process.repository';
import { CreateProcessDto } from '@/presentation/dtos/process/create-process.dto';
import { Process } from '@/domain/models/process.entity';
import { UserService } from './user.service';



@Injectable()
export class ProcessService extends TypeOrmQueryService<Process>{
  private readonly logger = new Logger(ProcessService.name);

  constructor(
    @InjectRepository(ProcessRepository)
    private readonly processRepository: ProcessRepository,
    private readonly userService: UserService, 
  ) {
    super(processRepository, { useSoftDelete: true });

  }

  async create(data: CreateProcessDto, userId: string): Promise<Process> {
    this.logger.debug('create');
    try {
      const user = await this.userService.get(userId);
      const process = this.processRepository.create({...data, user});

      return this.processRepository.save(process);
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar tratamento');
      
    }
  }

  async findByIds(ids: string[]): Promise<Process[]> {
    try {
      return this.processRepository.findByIds(ids);
    } catch(err) {
      throw new BadRequestException('Erro ao pesquisar Tratamentos');
    }
  }

  async findByUser(userId: string): Promise<Process[]> {
    try {
      return this.processRepository.find({
        where: { 
          user: { id: userId } 
        },
      });

    } catch(err) {
      throw new BadRequestException('Erro ao pesquisar Tratamentos');
    }
  }

  async delete(id: string): Promise<boolean> {
    this.logger.debug('delete');
    return !!(await this.processRepository.softDelete(id)).affected;
  }

}
