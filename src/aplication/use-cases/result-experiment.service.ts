import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment } from '@/domain/models/experiment.entity';
import { ResultExperiment } from '@/domain/models/result-experiment.entity';
import { ResultExperimentRepository } from '@/infrastructure/database/repositories/result-experiment.repository';
import { Process } from '@/domain/models/process.entity';
import { Enzyme } from '@/domain/models/enzyme.entity';
import { v4 } from 'uuid'

@Injectable()
export class ResultExperimentService {
  private readonly logger = new Logger(ResultExperimentService.name);

  constructor(
    @InjectRepository(ResultExperimentRepository)
    private readonly resultExperimentRepository: ResultExperimentRepository,
  ) {}

  async create(results: number[], average: number, process: Process, enzyme: Enzyme, experiment: Experiment): Promise<ResultExperiment> {
    this.logger.debug('create');

    try {
      const resultExperiment = this.resultExperimentRepository.create({
        experiment,
        process,
        enzyme,
        results,
        average,
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
      relations: ['process', 'enzyme', 'experiment', 'experiment.experimentEnzymes']
    });
  }
}
