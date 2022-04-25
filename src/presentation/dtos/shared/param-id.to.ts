import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Expose, plainToClass } from 'class-transformer';

@Injectable()
export class ParamDto {
  @ApiProperty({
    type: String,
    description: 'Resource ID',
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
    required: true,
  })
  @Expose()
  readonly id: string;

  constructor(obj: ParamDto) {
    Object.assign(this, plainToClass(ParamDto, obj, { excludeExtraneousValues: true }));
  }
}
