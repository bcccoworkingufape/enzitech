import { EntityRepository, Repository } from 'typeorm';
import { Experiment } from '@/domain/models/experiment.entity';

@EntityRepository(Experiment)
export class ExperimentRepository extends Repository<Experiment> {}
