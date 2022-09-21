import { EntityRepository, Repository } from 'typeorm';
import { Experiment } from '@/domain/models/experiment.entity';
import { ListExperimentsParam } from '@/presentation/dtos/experiment/interfaces/list-experiments-param.interface';

@EntityRepository(Experiment)
export class ExperimentRepository extends Repository<Experiment> {

  async list(param: ListExperimentsParam): Promise<{ experiments: Experiment[]; count: number }> {
    let query = await this.createQueryBuilder('experiments')
    .leftJoin('experiments.user', 'user', 'user.id = :userId', { userId: param.userId });

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
}
