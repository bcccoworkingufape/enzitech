import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Enzyme } from '@/domain/models/enzyme.entity';
import { Experiment } from '@/domain/models/experiment.entity';
import { Process } from '@/domain/models/process.entity';

export class CreateSaveResultExperimentDto {
  @ApiProperty({
    type: String,
    description: 'Name of enzyme',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @IsString()
  @Expose()
  readonly enzyme: Enzyme;

  @ApiProperty({
    type: String,
    description: 'Name of process',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @IsString()
  @Expose()
  readonly process: Process;

  @ApiProperty({
    type: String,
    description: 'Name of experiment',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @IsString()
  @Expose()
  readonly experiment: Experiment;

  @ApiProperty({
    type: Number,
    description: 'Sample of experiment',
    required: true,
    example: 0.405,
  })
  @IsNumber()
  @Expose()
  readonly sample: number;

  @ApiProperty({
    type: Number,
    description: 'White sample of experiment',
    required: true,
    example: 0.39,
  })
  @IsNumber()
  @Expose()
  readonly whiteSample: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 0.39,
  })
  @IsNumber()
  @Expose()
  readonly result: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 0.39,
  })
  @IsNumber()
  @Expose()
  readonly differenceBetweenSamples: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 0.39,
  })
  @IsNumber()
  @Expose()
  readonly curve: number;

  constructor(obj: CreateSaveResultExperimentDto) {
    Object.assign(this, plainToClass(CreateSaveResultExperimentDto, obj, { excludeExtraneousValues: true }));
  }
}
