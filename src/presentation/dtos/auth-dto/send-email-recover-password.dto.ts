import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class SendEmailRecoverPasswordDto {
  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: 'maria@email.com.br',
    required: true,
  })
  @IsEmail(undefined, { message: `Campo 'email' deve conter um e-mail válido.` })
  @Expose()
  readonly email: string;

  constructor(obj: SendEmailRecoverPasswordDto) {
    Object.assign(
      this,
      plainToClass(SendEmailRecoverPasswordDto, obj, { excludeExtraneousValues: true }),
    );
  }
}
