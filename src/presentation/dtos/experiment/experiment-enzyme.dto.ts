import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateExperimentEnzymeDto {
  @ApiProperty({
    type: String,
    description: 'Name of process',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @IsString()
  @Expose()
  readonly enzyme: string;

  @ApiProperty({
    type: Number,
    description: 'Curve variable A',
    example: 0.452,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  readonly variableA?: number;

  @ApiProperty({
    type: Number,
    description: 'Curve variable B',
    example: 1.642,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  readonly variableB?: number;

  @ApiProperty({
    type: Number,
    description: 'Duration in hours',
    example: 1.0,
    required: true,
  })
  @IsNumber()
  @Expose()
  readonly duration: number;

  @ApiProperty({
    type: Number,
    description: 'Weight of Sample in grams',
    example: 0.37,
    required: true,
  })
  @IsNumber()
  @Expose()
  readonly weightSample: number;

  @ApiProperty({
    type: Number,
    description: 'Weight of Ground in grams',
    example: 0.59,
    required: true,
  })
  @IsNumber()
  @Expose()
  readonly weightGround: number;

  @ApiProperty({
    type: Number,
    description: 'Size in Liters',
    example: 1.642,
    required: true,
  })
  @IsNumber()
  @Expose()
  readonly size: number;


  constructor(obj: CreateExperimentEnzymeDto) {
    Object.assign(this, plainToClass(CreateExperimentEnzymeDto, obj, { excludeExtraneousValues: true }));
  }
}
