import { EntityRepository, Repository } from 'typeorm';
import { Process } from '@/domain/models/process.entity';

@EntityRepository(Process)
export class ProcessRepository extends Repository<Process> {

  async getUserProcess(userId: string): Promise<any> {
    const query = await this.createQueryBuilder('process')
    .innerJoin('process.experiments', 'experiments')
    .innerJoin('experiments.user', 'user', 'user.id = :userId', { userId })
    .getMany();
    
    return query;
  }
}
