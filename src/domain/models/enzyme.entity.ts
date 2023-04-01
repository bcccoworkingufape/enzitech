import { Expose, plainToClass } from 'class-transformer';
import { IsDecimal, IsEnum, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnzymeType } from '@/presentation/dtos/enzyme/enums/enzyme-type.enum';
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

  @Column({ type: 'enum', enum: EnzymeType })
  @IsEnum(EnzymeType, { message: 'Tipo da enzima' })
  @Expose()
  type: EnzymeType;

  @OneToMany(() => ExperimentEnzyme, experimentEnzyme => experimentEnzyme.enzyme)
  experimentEnzymes: ExperimentEnzyme[];

  @Column({ type: 'varchar'})
  @IsString()
  @Expose()
  formula: string;

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
