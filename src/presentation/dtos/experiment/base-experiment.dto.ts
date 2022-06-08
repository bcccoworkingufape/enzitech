import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsNumber, IsString } from 'class-validator';
import { CreateExperimentEnzymeDto } from './experiment-enzyme.dto';

export class BaseExperimentDto {
  @ApiProperty({
    type: String,
    description: 'Name of experiment',
    required: true,
    example: 'Experimento 1',
  })
  @IsString()
  @Expose()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'experiment description',
    example: 'descrição do experimento',
    required: true,
  })
  @IsString()
  @Expose()
  readonly description: string;

  @ApiProperty({
    type: Number,
    description: 'experiment repetitions',
    example: 5,
    required: true,
  })
  @IsInt()
  @Expose()
  readonly repetitions: number;

  @ApiProperty({
    type: Number,
    description: 'experiment repetitions',
    example: 0.55,
    required: true,
  })
  @Transform(({value}) => {
    return Number(value).toFixed(2);
  })
  @Expose()
  readonly progress: number;

  @ApiProperty({
    type: String,
    description: 'Experiment creation date',
    required: true,
    example: new Date(),
  })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({
    type: String,
    description: 'Experiment update date',
    required: true,
    example: new Date(),
  })
  @Expose()
  readonly updatedAt: Date;

  constructor(obj: BaseExperimentDto) {
    Object.assign(this, plainToClass(BaseExperimentDto, obj, { excludeExtraneousValues: true }));
  }
}
