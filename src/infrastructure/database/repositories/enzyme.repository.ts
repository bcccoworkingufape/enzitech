import { EntityRepository, Repository } from 'typeorm';
import { Enzyme } from '@/domain/models/enzyme.entity';

@EntityRepository(Enzyme)
export class EnzymeRepository extends Repository<Enzyme> {}
