import { hash } from 'bcrypt';
import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole } from '@/presentation/dtos/user/enums/user-role.enum';
import { Env } from '@/shared/helpers/env.helper';

export class admin1642523941350 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
  
    const admin = {
      name: 'ADMIN',
      role: UserRole.Admin,
      passwordHash: await hash(Env.getString('ADM_PASSWORD'), Env.getNumber('SALT_ROUNDS')),
      email: Env.getString('ADM_EMAIL'),
    };
  

    await queryRunner.manager.getRepository('User').save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('User').delete({
      email: Env.getString('ADM_EMAIL')
    });
  }
}
