import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsArray } from 'class-validator';
import { BaseExperimentDto } from './base-experiment.dto';

export class ListExperimentDto {
  @ApiProperty({
    type: [BaseExperimentDto],
    description: 'Experiments',
    required: true,
  })
  @IsArray()
  @Expose()
  readonly experiments: BaseExperimentDto[];

  @ApiProperty({
    type: Number,
    description: 'Total of experiments',
    example: 10,
    required: true,
  })
  @IsArray()
  @Expose()
  readonly total: number;


  constructor(obj: ListExperimentDto) {
    Object.assign(this, plainToClass(ListExperimentDto, obj, { excludeExtraneousValues: true }));
  }
}
