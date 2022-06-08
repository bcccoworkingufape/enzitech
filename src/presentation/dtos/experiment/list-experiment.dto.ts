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


  constructor(obj: ListExperimentDto) {
    Object.assign(this, plainToClass(ListExperimentDto, obj, { excludeExtraneousValues: true }));
  }
}
