import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class ResultExperimentEnzymeProcessCalculateDto {
  @ApiProperty({
    type: [Number],
    description: 'calculate results',
    required: true,
    example: [34.9435, 46,6892, 177,3602],
  })
  @IsArray()
  @Expose()
  readonly results: number[];

  @ApiProperty({
    type: Number,
    description: 'Average of the calculation',
    required: true,
    example: 86.3309,
  })
  @IsNumber()
  @Expose()
  readonly average: number;

  constructor(obj: ResultExperimentEnzymeProcessCalculateDto) {
    Object.assign(this, plainToClass(ResultExperimentEnzymeProcessCalculateDto, obj, { excludeExtraneousValues: true }));
  }
}
