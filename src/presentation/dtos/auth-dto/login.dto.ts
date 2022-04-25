import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: '123456',
    required: true,
  })
  @IsString()
  @Expose()
  readonly password: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: 'adm@enzitech.com.br',
    required: true,
  })
  @IsEmail(undefined, { message: `Campo 'email' deve conter um e-mail válido.` })
  @Expose()
  readonly email: string;

  constructor(obj: LoginDto) {
    Object.assign(this, plainToClass(LoginDto, obj, { excludeExtraneousValues: true }));
  }
}
