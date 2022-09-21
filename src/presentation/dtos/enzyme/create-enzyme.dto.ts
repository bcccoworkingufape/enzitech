import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsDecimal, IsEnum, IsNumber, IsString } from 'class-validator';
import { EnzymeType } from './enums/enzyme-type.enum';

export class CreateEnzymeDto {
  @ApiProperty({
    type: String,
    description: 'Name of process',
    required: true,
    example: 'Processo 1',
  })
  @IsString()
  @Expose()
  readonly name: string;

  @ApiProperty({
    type: Number,
    description: 'Curve variable A',
    example: 0.452,
    required: true,
  })
  @IsNumber()
  @Expose()
  readonly variableA: number;

  @ApiProperty({
    type: Number,
    description: 'Curve variable B',
    example: 1.642,
    required: true,
  })
  @IsNumber()
  @Expose()
  readonly variableB: number;

  
  @ApiProperty({
    type: String,
    description: 'Type of enzyme',
    example: EnzymeType.Aryl,
    required: true,
  })
  @IsEnum(EnzymeType)
  @Expose()
  readonly type: EnzymeType;

  constructor(obj: CreateEnzymeDto) {
    Object.assign(this, plainToClass(CreateEnzymeDto, obj, { excludeExtraneousValues: true }));
  }
}
