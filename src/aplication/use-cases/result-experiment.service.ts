import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment } from '@/domain/models/experiment.entity';
import { ResultExperiment } from '@/domain/models/result-experiment.entity';
import { ResultExperimentRepository } from '@/infrastructure/database/repositories/result-experiment.repository';
import { Process } from '@/domain/models/process.entity';
import { Enzyme } from '@/domain/models/enzyme.entity';

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

      return this.resultExperimentRepository.save(resultExperiment);
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
}
