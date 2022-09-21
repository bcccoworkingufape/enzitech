import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Experiment } from './experiment.entity';
import { User } from './user.entity';

@Entity({ name: 'process', orderBy: { id: 'ASC' } })
export class Process {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'varchar'})
  @IsString()
  @Expose()
  name: string;

  @Column({ type: 'varchar'})
  @IsString()
  @Expose()
  description: string;

  @ManyToMany(() => Experiment, experiment => experiment.processes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @Expose()
  experiments: Experiment[];

  @CreateDateColumn({ name: 'createdAt' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @Expose()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  @Expose()
  deletedAt?: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Index()
  @Expose()
  user: User;

  constructor(process: Process) {
    Object.assign(this, plainToClass(Process, process, { excludeExtraneousValues: true }));
  }
}
