import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateExperimentDataDto {
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

  constructor(obj: CreateExperimentDataDto) {
    Object.assign(this, plainToClass(CreateExperimentDataDto, obj, { excludeExtraneousValues: true }));
  }
}
