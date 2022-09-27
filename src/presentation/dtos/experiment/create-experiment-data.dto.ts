import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateExperimentDataDto {
  @ApiProperty({
    type: String,
    description: 'Sample of experiment',
    required: true,
    example: 0.566,
  })
  @IsNumber()
  @Expose()
  readonly sample: number;

  @ApiProperty({
    type: String,
    description: 'White sample of experiment',
    required: true,
    example: 0.486,
  })
  @IsNumber()
  @Expose()
  readonly whiteSample: string;

  constructor(obj: CreateExperimentDataDto) {
    Object.assign(this, plainToClass(CreateExperimentDataDto, obj, { excludeExtraneousValues: true }));
  }
}
