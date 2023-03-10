import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperimentRepository } from '@/infrastructure/database/repositories/experiment.repository';
import { CreateExperimentDto } from '@/presentation/dtos/experiment/create-experiment.dto';
import { ExperimentEnzymeService } from './experiment-enzyme.service';
import { UserService } from './user.service';
import { ProcessService } from './process.service';
import { ListExperimentDto } from '@/presentation/dtos/experiment/list-experiment.dto';
import { BaseExperimentDto } from '@/presentation/dtos/experiment/base-experiment.dto';
import { ListExperimentFilterDto } from '@/presentation/dtos/experiment/list-experiment-filter.dto';
import { ExperimentDto } from '@/presentation/dtos/experiment/experiment.dto';
import { CalculateExperimentEnzymeDto } from '@/presentation/dtos/experiment/calculate-experiment-calculation.dto';
import { ResultExperimentEnzymeProcessCalculateDto } from '@/presentation/dtos/experiment/result-experiment-enzyme-process-calculation.dto';
import { CalculateExperimentService } from './calculate-experiment.service';


@Injectable()
export class ExperimentService {
  private readonly logger = new Logger(ExperimentService.name);

  constructor(
    @InjectRepository(ExperimentRepository)
    private readonly experimentRepository: ExperimentRepository,
    private readonly experimentEnzymeService: ExperimentEnzymeService,
    private readonly userService: UserService, 
    private readonly processService: ProcessService, 
    private readonly calculateExperimentService: CalculateExperimentService,


  ) {}

  async create(data: CreateExperimentDto, userId: string): Promise<BaseExperimentDto> {
    this.logger.debug('create');
    try {
      const user = await this.userService.get(userId);
      const processes = await this.processService.findByIds(data.processes);
      const experiment = this.experimentRepository.create({
        name: data.name,
        description: data.description,
        repetitions: data.repetitions,
        user,
        processes
      });
      const experimentCreated = await this.experimentRepository.save(experiment);

      await this.experimentEnzymeService.bulkCreate(data.experimentsEnzymes, experimentCreated);
      
      return new BaseExperimentDto({...experimentCreated});
    } catch (err) {
      throw new BadRequestException(err.message ?? 'Erro ao cadastrar experimento');
    }
  }

  async list(filter: ListExperimentFilterDto, userId: string): Promise<ListExperimentDto> {
    this.logger.debug('list');

    const { experiments, count } = await this.experimentRepository.list({
      page: filter.page ?? 1,
      ordering: filter.ordering ?? 'ASC',
      orderBy: filter.orderBy,
      limit: filter.limit ?? 10,
      finished: filter.finished ?? false,
      userId
    });

    return new ListExperimentDto({ experiments: experiments.map(experiment => new BaseExperimentDto(experiment)), total: count });
  }

  async get(experimentId: string, userId: string): Promise<ExperimentDto> {
    this.logger.debug('get');
    try {
      const experiment: any = await this.experimentRepository.findOneOrFail({
        where: { 
          id: experimentId,
          user: { 
            id: userId
          }
        },
        relations: ['processes', 'experimentEnzymes']
      });
  
      return new ExperimentDto(experiment, experiment.experimentEnzymes, experiment.processes);
    } catch (error) {
      
      throw new BadRequestException(error.message ?? "Erro ao buscar experimento");
    }
    
  }


  async delete(id: string): Promise<boolean> {
    this.logger.debug('delete');
    return !!(await this.experimentRepository.delete(id)).affected;
  }

  async calculate(data: CalculateExperimentEnzymeDto, experimentId: string): Promise<ResultExperimentEnzymeProcessCalculateDto> {
    this.logger.debug('create');
    try {
      const experiment = await this.experimentRepository.findExperiment(data.enzyme, data.process, experimentId);
      const [enzyme] = experiment.enzymes;
      

      if(data.experimentData.length !== experiment.repetitions) {
        throw new Error("Número de repetições inválidas");
        
      }
      if(!enzyme) {
        throw new Error("Enzima não encontrada");

      }

      return this.calculateExperimentService.calculate(enzyme, data.experimentData);

      
    } catch (err) {
      this.logger.log('Erro:', err.message);
      throw new BadRequestException(err.message ?? 'Erro ao cadastrar experimento');
    }
  }

}
