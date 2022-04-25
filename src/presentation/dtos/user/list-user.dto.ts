import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { UserDto } from './user.dto';

export class ListUserDto {
  @ApiProperty({
    type: UserDto,
    description: 'List of users',
    required: true,
  })
  @Expose()
  readonly users: UserDto[];

  @ApiProperty({
    type: Number,
    description: 'User count',
  })
  @Expose()
  readonly count: number;

  constructor(obj: ListUserDto) {
    Object.assign(this, plainToClass(ListUserDto, obj, { excludeExtraneousValues: true }));
  }
}
