import { Expose, plainToClass } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionInfo } from '../../presentation/dtos/auth-dto/interfaces/session-info.interface';

@Entity({ name: 'sessions', orderBy: { id: 'ASC' } })
export class AuthSession {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'json' })
  @Expose()
  data: SessionInfo;

  @CreateDateColumn({ name: 'createdAt' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @Expose()
  updatedAt: Date;

  @Column()
  @Expose()
  expiresAt: Date;

  constructor(user: AuthSession) {
    Object.assign(this, plainToClass(AuthSession, user, { excludeExtraneousValues: true }));
  }
}
