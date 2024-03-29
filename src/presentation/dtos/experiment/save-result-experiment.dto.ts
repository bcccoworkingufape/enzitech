import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { CreateExperimentDataDto } from './create-experiment-data.dto';

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
    type: [CreateExperimentDataDto],
    description: 'Data to calculate the result of experiment',
    required: true,
  })
  @IsArray()
  @Expose()
  readonly experimentData: CreateExperimentDataDto[];

  constructor(obj: SaveResultExperimentDto) {
    Object.assign(this, plainToClass(SaveResultExperimentDto, obj, { excludeExtraneousValues: true }));
  }
}
