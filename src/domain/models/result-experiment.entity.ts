import { Expose, plainToClass } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Enzyme } from './enzyme.entity';
import { Experiment } from './experiment.entity';
import { Process } from './process.entity';

@Entity({ name: 'experiments_results', orderBy: { createdAt: 'ASC' } })
export class ResultExperiment {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @OneToOne(() => Process, { primary: true, cascade: true })
  @JoinColumn({ name: 'processId' })
  process: Process;

  @OneToOne(() => Enzyme, { primary: true, cascade: true })
  @JoinColumn({ name: 'enzymeId' })
  enzyme: Enzyme;

  @OneToOne(() => Experiment, { primary: true, cascade: true })
  @JoinColumn({ name: 'experimentId' })
  experiment: Experiment;

  @Column("int", { array: true, default: [] })
  results: number[];

  @CreateDateColumn({ name: 'createdAt' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @Expose()
  updatedAt: Date;


  constructor(resultExperiment: ResultExperiment) {
    Object.assign(this, plainToClass(ResultExperiment, resultExperiment, { excludeExtraneousValues: true }));
  }
}
