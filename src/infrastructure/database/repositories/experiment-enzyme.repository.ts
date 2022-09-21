import { EntityRepository, Repository } from 'typeorm';
import { ExperimentEnzyme } from '@/domain/models/experiment-enzyme.entity';


@EntityRepository(ExperimentEnzyme)
export class ExperimentEnzymeRepository extends Repository<ExperimentEnzyme> {
 
  
}
