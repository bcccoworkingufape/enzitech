import { EntityRepository, Repository } from 'typeorm';
import { Experiment } from '@/domain/models/experiment.entity';
import { ListExperimentsParam } from '@/presentation/dtos/experiment/interfaces/list-experiments-param.interface';
import { ExperimentDto } from '@/presentation/dtos/experiment/experiment.dto';

@EntityRepository(Experiment)
export class ExperimentRepository extends Repository<Experiment> {

  async list(param: ListExperimentsParam): Promise<{ experiments: Experiment[]; count: number }> {
    let query = await this.createQueryBuilder('experiments')
    .where('experiments.user.id = :userId', { userId: param.userId });

    if (param.finished) {
      query = query.where(`experiments."finishedAt" IS NOT NULL`);
    }

    if (param.orderBy) {
      query = query.orderBy(`experiments.${param.orderBy}`, param.ordering);
    }

    const [experiments, count] = await query
      .skip(param.limit * (param.page - 1))
      .take(param.limit)
      .getManyAndCount();

    return {
      experiments,
      count,
    };
  }

  async findExperiment(enzymeId: string, processId: string, experimentId: string): Promise<ExperimentDto> {
    const experiment = await this.createQueryBuilder('experiments')
    .leftJoinAndSelect('experiments.experimentEnzymes', 'experimentEnzymes', 
      'experimentEnzymes.enzyme.id = :enzymeId', {
        enzymeId
      }
    )
    .leftJoinAndSelect('experimentEnzymes.enzyme', 'enzyme')
    .leftJoinAndSelect('experiments.processes', 'processes', 
    'processes.id = :processId', { processId})
    .where('experiments.id = :experimentId', { experimentId})
    .getOneOrFail();
    return new ExperimentDto(experiment, experiment.experimentEnzymes, experiment.processes);
  }

  async findEnzymesByExperiment(processId: string, experimentId: string): Promise<any> {
    const result = await this
      .createQueryBuilder('experiments')
      .leftJoinAndSelect('experiments.experimentEnzymes', 'experimentEnzymes')
      .leftJoinAndSelect('experimentEnzymes.enzyme', 'enzyme')
      .leftJoinAndSelect('experiments.processes', 'processes', 'processes.id = :processId', { processId })
      .where('experiments.id = :experimentId', { experimentId })
      .getOneOrFail();

    return result;
  }
}
