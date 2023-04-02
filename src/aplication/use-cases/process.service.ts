import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { ProcessRepository } from '@/infrastructure/database/repositories/process.repository';
import { CreateProcessDto } from '@/presentation/dtos/process/create-process.dto';
import { Process } from '@/domain/models/process.entity';
import { UserService } from './user.service';
import { ProcessDto } from '@/presentation/dtos/process/process.dto';

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

  async create(data: CreateProcessDto, userId: string): Promise<ProcessDto> {
    this.logger.debug('create');
    try {
      const user = await this.userService.get(userId);
      const process = this.processRepository.create({...data, user});
      const savedProcess = await this.processRepository.save(process);
      return new ProcessDto(savedProcess);
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar tratamento');
      
    }
  }

  async findByIds(ids: string[], userId: string): Promise<Process[]> {
      const processes = await this.processRepository.findByIds(ids, { 
        where: { 
          user: { 
            id: userId  
          }
        } 
      });

      if (!processes.length) {
        throw new BadRequestException('Erro ao pesquisar Tratamentos');
      }

      return processes;
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

  async findByIdAndUserId(id: string, userId: string): Promise<Process> {
    try {
      return await this.processRepository.findOneOrFail({
        where: { 
          id,
          user: {
            id: userId
          }
        },
      });

    } catch(err) {
      throw new BadRequestException('Erro ao pesquisar Tratamentos');
    }
  }
}
