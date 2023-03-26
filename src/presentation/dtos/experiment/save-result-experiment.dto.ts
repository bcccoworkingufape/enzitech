import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class SaveResultExperimentDto {
  @ApiProperty({
    type: String,
    description: 'Name of enzyme',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @IsString()
  @Expose()
  readonly enzyme: string;

  @ApiProperty({
    type: String,
    description: 'Name of process',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @IsString()
  @Expose()
  readonly process: string;

  @ApiProperty({
    type: [Number],
    description: 'Data to save result',
    required: true,
    example: [49.25589, 50.1033]
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

  constructor(obj: SaveResultExperimentDto) {
    Object.assign(this, plainToClass(SaveResultExperimentDto, obj, { excludeExtraneousValues: true }));
  }
}
