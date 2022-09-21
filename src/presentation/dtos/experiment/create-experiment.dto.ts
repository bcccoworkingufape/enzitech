import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsString } from 'class-validator';
import { CreateExperimentEnzymeDto } from './experiment-enzyme.dto';

export class CreateExperimentDto {
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
    type: [String],
    description: 'Processes of experiment',
    required: true,
    example: ['25a243db-1008-4268-a08b-efb7429f6bfa', '123a243db-2153-4268-a08b-efb7429f6bfa '],
  })
  @IsArray()
  @Expose()
  readonly processes: string[];


  @ApiProperty({
    type: [CreateExperimentEnzymeDto],
    required: true,
  })
  @Expose()
  readonly experimentsEnzymes: CreateExperimentEnzymeDto[];


  constructor(obj: CreateExperimentDto) {
    Object.assign(this, plainToClass(CreateExperimentDto, obj, { excludeExtraneousValues: true }));
  }
}
