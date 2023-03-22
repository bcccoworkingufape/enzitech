import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment } from '@/domain/models/experiment.entity';
import { ResultExperiment } from '@/domain/models/result-experiment.entity';
import { ResultExperimentRepository } from '@/infrastructure/database/repositories/result-experiment.repository';
import { SaveResultExperimentDto } from '@/presentation/dtos/experiment/save-result-experiment.dto';
import { EnzymeService } from './enzyme.service';
import { ProcessService } from './process.service';

@Injectable()
export class ResultExperimentService {
  private readonly logger = new Logger(ResultExperimentService.name);

  constructor(
    @InjectRepository(ResultExperimentRepository)
    private readonly resultExperimentRepository: ResultExperimentRepository,
    private readonly processService: ProcessService,
    private readonly enzymeService: EnzymeService,
  ) {}

  async create(data: SaveResultExperimentDto, experiment: Experiment): Promise<ResultExperiment> {
    this.logger.debug('create');
    try {
      const process = await this.processService.findById(data.process);
      const enzyme = await this.enzymeService.findById(data.enzyme);

      const resultExperiment = this.resultExperimentRepository.create({
        experiment,
        process,
        enzyme,
        results: data.results
      });

      return this.resultExperimentRepository.save(resultExperiment);
    } catch (err) {
      throw new BadRequestException('Erro ao salvar o resultado do experimento');
    }
  }
}
