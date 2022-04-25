import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Expose, plainToClass } from 'class-transformer';

@Injectable()
export class MessageDto {
  @ApiProperty({
    type: String,
    description: 'Sucessful Message',
    example: 'Update Sucessful!',
    required: true,
  })
  @IsString()
  @Expose()
  readonly message: string;

  constructor(obj: MessageDto) {
    Object.assign(this, plainToClass(MessageDto, obj, { excludeExtraneousValues: true }));
  }
}
