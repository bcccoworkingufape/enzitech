import { EntityRepository, Repository } from 'typeorm';
import { ResultExperiment } from '@/domain/models/result-experiment.entity';

@EntityRepository(ResultExperiment)
export class ResultExperimentRepository extends Repository<ResultExperiment> {}
