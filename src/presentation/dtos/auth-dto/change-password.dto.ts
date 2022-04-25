import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: 'new password of user',
    example: '123456',
    required: true,
  })
  @IsString()
  @Expose()
  readonly password: string;

  @ApiProperty({
    type: String,
    description: 'Confirm new password of user',
    example: '123456',
    required: true,
  })
  @IsString()
  @Expose()
  readonly passwordConfirm: string;

  constructor(obj: ChangePasswordDto) {
    Object.assign(this, plainToClass(ChangePasswordDto, obj, { excludeExtraneousValues: true }));
  }
}
