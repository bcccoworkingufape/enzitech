import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from './enums/user-role.enum';

export class BaseUserDto {
  @ApiProperty({
    type: String,
    description: 'Full name of user',
    required: true,
    example: 'Maria da silva',
  })
  @IsString()
  @Expose()
  readonly name?: string | null;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: 'maria@email.com.br',
    required: true,
  })
  @IsEmail()
  @Expose()
  readonly email: string;


  constructor(obj: BaseUserDto) {
    Object.assign(this, plainToClass(BaseUserDto, obj, { excludeExtraneousValues: true }));
  }
}
