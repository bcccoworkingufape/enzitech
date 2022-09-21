import { Expose, plainToClass } from 'class-transformer';
import { IsBoolean, IsDecimal } from 'class-validator';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Experiment } from './experiment.entity';
import { Enzyme } from './enzyme.entity';

@Entity({ name: 'experiments_enzymes', orderBy: { id: 'ASC' } })
export class ExperimentEnzyme {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ManyToOne(() => Experiment, experiment => experiment.experimentEnzymes, {
    primary: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Expose()
  @Index()
  experiment: Experiment;

  @ManyToOne(() => Enzyme, enzyme => enzyme.experimentEnzymes, {
    primary: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Expose()
  @Index()
  enzyme: Enzyme;

  @Column({ type: 'decimal'})
  @IsDecimal()
  @Expose()
  variableA: number;

  @Column({ type: 'decimal'})
  @IsDecimal()
  @Expose()
  variableB: number;

  @Column({ type: 'decimal', nullable: false })
  @IsDecimal()
  @Expose()
  duration: number;

  @Column({ type: 'decimal', nullable: false })
  @IsDecimal()
  @Expose()
  weightSample: number;

  @Column({ type: 'decimal', nullable: false })
  @IsDecimal()
  @Expose()
  weightGround: number;

  @Column({ type: 'decimal', nullable: false })
  @IsDecimal()
  @Expose()
  size: number;

  constructor(experimentEnzyme: ExperimentEnzyme) {
    Object.assign(
      this,
      plainToClass(ExperimentEnzyme, experimentEnzyme, { excludeExtraneousValues: true }),
    );
  }
}
