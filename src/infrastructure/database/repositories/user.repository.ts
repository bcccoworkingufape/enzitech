import { EntityRepository, Repository } from 'typeorm';
import { ListUserParam } from '../../../presentation/dtos/user/interfaces/list-user-param.interface';
import { User } from '../../../domain/models/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async list(param: ListUserParam): Promise<{ users: User[]; count: number }> {
    let query = await this.createQueryBuilder('users');

    let first = true;

    if (param.email) {
      query = query.where(`users.email ILIKE '%${param.email}%'`);
      first = false;
    }

    if (param.name) {
      query = first
        ? query.where(`users.name ILIKE '%${param.name}%'`)
        : query.andWhere(`users.name ILIKE '%${param.name}%'`);

      first = false;
    }

    if (param.role) {
      query = first
        ? query.where(`users.role ILIKE '%${param.role}%'`)
        : query.andWhere(`users.role ILIKE '%${param.role}%'`);

      first = false;
    }

    if (param.initialDate) {
      query.andWhere(`users.createdAt >= :initialDate`, { initialDate: param.initialDate });
    }

    if (param.finalDate) {
      query.andWhere(`users.createdAt <= :finalDate`, { finalDate: `${param.finalDate} 23:59:59` });
    }

    if (param.orderBy) {
      query = query.orderBy(`users.${param.orderBy}`, param.ordering);
    }

    const [users, count] = await query
      .skip(param.limit * (param.page - 1))
      .take(param.limit)
      .getManyAndCount();

    return {
      users,
      count,
    };
  }
}
