import { Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExperimentEnzyme } from './experiment-enzyme.entity';
import { Process } from './process.entity';
import { User } from './user.entity';

@Entity({ name: 'experiments', orderBy: { createdAt: 'ASC' } })
export class Experiment {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'varchar'})
  @IsString()
  @Expose()
  name: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty({ message: 'O campo descrição é obrigatorio' })
  @IsString()
  @Expose()
  description: string;

  @Column({ type: 'int' })
  @IsInt()
  @Expose()
  repetitions: number;

  @CreateDateColumn({ name: 'createdAt' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @Expose()
  updatedAt: Date;

  @Column({ type: 'date', nullable: true, default: null })
  @Expose()
  finishedAt?: Date;

  @OneToMany(() => ExperimentEnzyme, experimentEnzyme => experimentEnzyme.experiment)
  experimentEnzymes: ExperimentEnzyme[];

  @OneToMany(() => Process, process => process.experiment)
  processes: Process[];

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Index()
  @Expose()
  user: User;

  constructor(experiment: Experiment) {
    Object.assign(this, plainToClass(Experiment, experiment, { excludeExtraneousValues: true }));
  }
}
