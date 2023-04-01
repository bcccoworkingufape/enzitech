import { Expose, plainToClass } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDecimal } from 'class-validator';
import { Enzyme } from './enzyme.entity';
import { Experiment } from './experiment.entity';
import { Process } from './process.entity';

@Entity({ name: 'experiments_results', orderBy: { createdAt: 'ASC' } })
export class ResultExperiment {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ManyToOne(() => Process, { primary: true, cascade: true })
  @JoinColumn({ name: 'processId' })
  process: Process;

  @ManyToOne(() => Enzyme, { primary: true, cascade: true })
  @JoinColumn({ name: 'enzymeId' })
  enzyme: Enzyme;

  @ManyToOne(() => Experiment, { primary: true, cascade: true })
  @JoinColumn({ name: 'experimentId' })
  experiment: Experiment;

  @Column('decimal')
  @IsDecimal()
  @Expose()
  result: number;

  @Column('decimal')
  @IsDecimal()
  @Expose()
  sample: number;

  @Column('decimal')
  @IsDecimal()
  @Expose()
  whiteSample: number;

  @Column({ type: 'decimal' })
  @IsDecimal()
  @Expose()
  differenceBetweenSamples: number;

  @Column('decimal')
  @IsDecimal()
  @Expose()
  curve: number;

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
