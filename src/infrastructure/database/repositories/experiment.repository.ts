import { EntityRepository, Repository } from 'typeorm';
import { Experiment } from '@/domain/models/experiment.entity';
import { ListExperimentsParam } from '@/presentation/dtos/experiment/interfaces/list-experiments-param.interface';
import { ExperimentDto } from '@/presentation/dtos/experiment/experiment.dto';

@EntityRepository(Experiment)
export class ExperimentRepository extends Repository<Experiment> {

  async list(param: ListExperimentsParam): Promise<{ experiments: Experiment[]; count: number }> {
    const query = this
      .createQueryBuilder('experiments')
      .where('experiments.user.id = :userId', { userId: param.userId });

    if (param.finished) {
      query.andWhere(`experiments."finishedAt" IS NOT NULL`);
    } else {
      query.andWhere(`experiments."finishedAt" IS NULL`);
    }

    if (param.orderBy) {
      query.orderBy(`experiments.${param.orderBy}`, param.ordering);
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

  async findExperimentByIdAndEnzymeIdAndProcessId(experimentId: string, enzymeId: string, processId: string): Promise<ExperimentDto> {
    const experiment = await this
      .createQueryBuilder('experiments')
      .leftJoinAndSelect(
        'experiments.experimentEnzymes', 'experimentEnzymes', 
        'experimentEnzymes.enzyme.id = :enzymeId', { enzymeId }
      )
      .leftJoinAndSelect('experimentEnzymes.enzyme', 'enzyme')
      .leftJoinAndSelect('experiments.processes', 'processes', 'processes.id = :processId', { processId })
      .where('experiments.id = :experimentId', { experimentId })
      .getOneOrFail();

    return new ExperimentDto(experiment, experiment.experimentEnzymes, experiment.processes);
  }

  async findExperimentByIdAndProcessId(experimentId: string, processId: string): Promise<any> {
    const result = await this
      .createQueryBuilder('experiments')
      .leftJoinAndSelect('experiments.experimentEnzymes', 'experimentEnzymes')
      .leftJoinAndSelect('experimentEnzymes.enzyme', 'enzyme')
      .leftJoinAndSelect('experiments.processes', 'processes', 'processes.id = :processId', { processId })
      .where('experiments.id = :experimentId', { experimentId })
      .getOneOrFail();

    return result;
  }

  async findExperimentById(experimentId: string): Promise<any> {
    const result = await this
      .createQueryBuilder('experiments')
      .leftJoinAndSelect('experiments.experimentEnzymes', 'experimentEnzymes')
      .leftJoinAndSelect('experimentEnzymes.enzyme', 'enzyme')
      .leftJoinAndSelect('experiments.processes', 'processes')
      .where('experiments.id = :experimentId', { experimentId })
      .getOneOrFail();

    return result;
  }
}
