import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: String,
    description: 'Token to reset user password',
    example: '65868ca4980862617347c3ec24bdde055c9cba56427a06b8d9faa71c01a765f5',
    required: true,
  })
  @IsOptional()
  @IsString()
  @Expose()
  readonly recoverToken?: string | null;

  constructor(obj: UpdateUserDto) {
    super(obj);
    Object.assign(this, plainToClass(UpdateUserDto, obj, { excludeExtraneousValues: true }));
  }
}
