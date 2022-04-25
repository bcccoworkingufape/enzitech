import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: '123456',
    required: true,
  })
  @IsString()
  @Expose()
  readonly password: string;

  constructor(obj: CreateUserDto) {
    super(obj);
    Object.assign(this, plainToClass(CreateUserDto, obj, { excludeExtraneousValues: true }));
  }
}
