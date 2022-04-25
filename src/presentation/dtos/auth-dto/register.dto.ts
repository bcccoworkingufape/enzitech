import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user/enums/user-role.enum';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'user name',
    example: 'Wendell',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Expose()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: '123456',
    required: true,
  })
  @IsString({ message: `senha não pode ser vazia.` })
  @Expose()
  readonly password: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: 'maria@email.com.br',
    required: true,
  })
  @IsEmail(undefined, { message: `Campo de e-mail inválido.` })
  @Expose()
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  readonly email: string;

  constructor(obj: RegisterDto) {
    Object.assign(this, plainToClass(RegisterDto, obj, { excludeExtraneousValues: true }));
  }
}
