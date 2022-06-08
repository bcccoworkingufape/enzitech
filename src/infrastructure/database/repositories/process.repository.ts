import { EntityRepository, Repository } from 'typeorm';
import { Process } from '@/domain/models/process.entity';

@EntityRepository(Process)
export class ProcessRepository extends Repository<Process> {}
