import { Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../presentation/dtos/user/enums/user-role.enum';
import { Experiment } from './experiment.entity';

@Entity({ name: 'users', orderBy: { name: 'ASC' } })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  @Expose()
  name?: string | null;

  @Column({ type: 'varchar', unique: true })
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  @IsEmail()
  @Expose()
  email: string;

  @Column({ type: 'varchar' })
  @IsString({ message: 'Senha inválida' })
  @Expose()
  passwordHash: string;

  @Column({ type: 'varchar', default: UserRole.User  })
  @IsEnum(UserRole, { message: 'Tipo do usuário deve ser Admin, User' })
  @Expose()
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })
  @Expose()
  recoverToken?: string | null;

  @OneToMany(() => Experiment, experiment => experiment.user)
  @Expose()
  experiments: Experiment[];

  @CreateDateColumn({ name: 'createdAt' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @Expose()
  updatedAt: Date;

  @Column({ type: 'date', default: null, nullable: true })
  @Expose()
  lastLogin?: Date;

  constructor(user: User) {
    Object.assign(this, plainToClass(User, user, { excludeExtraneousValues: true }));
  }
}
