import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment } from '@/domain/models/experiment.entity';
import { ResultExperiment } from '@/domain/models/result-experiment.entity';
import { ResultExperimentRepository } from '@/infrastructure/database/repositories/result-experiment.repository';
import { Process } from '@/domain/models/process.entity';
import { Enzyme } from '@/domain/models/enzyme.entity';
import { CreateSaveResultExperimentDto } from '@/presentation/dtos/experiment/create-save-result-experiment-dto';

@Injectable()
export class ResultExperimentService {
  private readonly logger = new Logger(ResultExperimentService.name);

  constructor(
    @InjectRepository(ResultExperimentRepository)
    private readonly resultExperimentRepository: ResultExperimentRepository,
  ) {}

  async create(data: CreateSaveResultExperimentDto): Promise<ResultExperiment> {
    this.logger.debug('create');

    try {
      const resultExperiment = this.resultExperimentRepository.create({
        experiment: data.experiment,
        process: data.process,
        enzyme: data.enzyme,
        result: data.result,
        sample: data.sample,
        whiteSample: data.whiteSample,
        differenceBetweenSamples: data.differenceBetweenSamples,
        curve: data.curve
      });

      const save = await this.resultExperimentRepository.save(resultExperiment);

      return save;
    } catch (err) {
      throw new BadRequestException('Erro ao salvar o resultado do experimento');
    }
  }

  async findResultExperiment(process: Process, enzyme: Enzyme, experiment: Experiment): Promise<ResultExperiment | undefined> {
    this.logger.debug('get');
    
    return this.resultExperimentRepository.findOne({
      where: {
        process,
        enzyme,
        experiment
      }
    });
  }

  async listResultsExperiment(experiment: Experiment): Promise<ResultExperiment[] | undefined> {
    this.logger.debug('get');

    return this.resultExperimentRepository.find({
      where: {
        experiment
      },
      relations: ['process', 'enzyme', 'experiment'],
      order: { createdAt: 'ASC' }
    });
  }

  async countResultExperiment(experiment: Experiment): Promise<number> {
    this.logger.debug('get');
    
    return this.resultExperimentRepository.count({
      where: {
        experiment
      }
    });
  }
}
