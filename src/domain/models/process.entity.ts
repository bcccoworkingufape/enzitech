import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Experiment } from './experiment.entity';

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

  @ManyToOne(() => Experiment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'experiment_id', referencedColumnName: 'id' })
  @Index()
  @Expose()
  experiment?: Experiment | null;

  @CreateDateColumn({ name: 'createdAt' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @Expose()
  updatedAt: Date;

  constructor(process: Process) {
    Object.assign(this, plainToClass(Process, process, { excludeExtraneousValues: true }));
  }
}
