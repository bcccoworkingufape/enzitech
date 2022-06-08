import { Expose, plainToClass } from 'class-transformer';
import { IsDecimal, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExperimentEnzyme } from './experiment-enzyme.entity';

@Entity({ name: 'enzyme', orderBy: { id: 'ASC' } })
export class Enzyme {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'varchar'})
  @IsString()
  @Expose()
  name: string;

  @Column({ type: 'decimal'})
  @IsDecimal()
  @Expose()
  variableA: number;

  @Column({ type: 'decimal'})
  @IsDecimal()
  @Expose()
  variableB: number;

  @OneToMany(() => ExperimentEnzyme, experimentEnzyme => experimentEnzyme.enzyme)
  experimentEnzymes: ExperimentEnzyme[];

  @CreateDateColumn({ name: 'createdAt' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @Expose()
  updatedAt: Date;

  constructor(enzyme: Enzyme) {
    Object.assign(this, plainToClass(Enzyme, enzyme, { excludeExtraneousValues: true }));
  }
}
