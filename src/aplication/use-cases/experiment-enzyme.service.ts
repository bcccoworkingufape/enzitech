import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExperimentEnzymeRepository } from '@/infrastructure/database/repositories/experiment-enzyme.repository';
import { CreateExperimentEnzymeDto } from '@/presentation/dtos/experiment/create-experiment-enzyme.dto';
import { Experiment } from '@/domain/models/experiment.entity';
import { ExperimentEnzyme } from '@/domain/models/experiment-enzyme.entity';
import { EnzymeService } from './enzyme.service';

@Injectable()
export class ExperimentEnzymeService {
  private readonly logger = new Logger(ExperimentEnzymeService.name);

  constructor(
    @InjectRepository(ExperimentEnzymeRepository)
    private readonly experimentEnzymeRepository: ExperimentEnzymeRepository,
    private readonly enzymeService: EnzymeService,
  ) {}

  async create(data: CreateExperimentEnzymeDto, experiment: Experiment): Promise<ExperimentEnzyme> {
    this.logger.debug('create');
    try {
      const enzyme = await this.enzymeService.findById(data.enzyme);
      let {variableA, variableB} = data;
      if(!variableA || !variableB) {
        variableA = enzyme.variableA;
        variableB = enzyme.variableB;
      }
      const experimentEnzyme = this.experimentEnzymeRepository.create({
        ...data,
        variableA,
        variableB,
        enzyme,
        experiment
      });

      return this.experimentEnzymeRepository.save(experimentEnzyme);
    } catch (err) {
      throw new BadRequestException('Erro ao cadastrar Experimento e enzima');
    }
  }

  async bulkCreate(data: CreateExperimentEnzymeDto[], experiment: Experiment): Promise<void> {
    const calls = data.map(experimentEnzy => (this.create(experimentEnzy, experiment)));

    await Promise.all(calls);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.debug('delete');
    return !!(await this.experimentEnzymeRepository.delete(id)).affected;
  }

  async find(experiment: string, enzyme: string): Promise<ExperimentEnzyme> {
    this.logger.debug('get');
    
    try {
      return this.experimentEnzymeRepository.findOneOrFail({
        where: {
          experiment,
          enzyme
        }
      });
    } catch (error) {
      throw new BadRequestException('Experiment Enzyme not found');
    }
  }
}
