import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EnzymeType } from '../enzyme/enums/enzyme-type.enum';

export class ExperimentEnzymeDto {
  @ApiProperty({
    type: String,
    description: 'ID of enzyme experiment',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @IsString()
  @Expose()
  readonly id: string;

  @ApiProperty({
    type: String,
    description: 'Name of enzyme',
    required: true,
    example: 'Enzyme Z',
  })
  @IsString()
  @Expose()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Type of enzyme',
    example: EnzymeType.Aryl,
    required: true,
  })
  @IsEnum(EnzymeType)
  @Expose()
  readonly type: EnzymeType;

  @ApiProperty({
    type: String,
    description: 'Formula of enzyme',
    example: 'µg PNP g-1 solo h-1',
    required: true,
  })
  @IsString()
  @Expose()
  readonly formula: string;

  @ApiProperty({
    type: Number,
    description: 'Curve variable A',
    example: 0.452,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  readonly variableA: number;

  @ApiProperty({
    type: Number,
    description: 'Curve variable B',
    example: 1.642,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  readonly variableB: number;

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


  constructor(obj: ExperimentEnzymeDto) {
    Object.assign(this, plainToClass(ExperimentEnzymeDto, obj, { excludeExtraneousValues: true }));
  }
}
