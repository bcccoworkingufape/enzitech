import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { UserRole } from './enums/user-role.enum';

export class UserDto extends BaseUserDto {
  @ApiProperty({
    type: String,
    description: 'User ID',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @Expose()
  readonly id: string;

  @ApiProperty({
    type: String,
    description: 'User creation date',
    required: true,
    example: new Date(),
    name: 'createdAt',
  })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({
    type: String,
    description: 'User update date',
    required: true,
    example: new Date(),
    name: 'updatedAt',
  })
  @Expose()
  readonly updatedAt: Date;

  @ApiProperty({
    type: String,
    description: 'User role',
    required: true,
    example: UserRole.User,
  })
  @IsEnum(UserRole)
  @Expose()
  readonly role: UserRole;

  constructor(obj: UserDto) {
    super(obj);
    Object.assign(this, plainToClass(UserDto, obj, { excludeExtraneousValues: true }));
  }
}
