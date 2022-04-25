import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { UserDto } from '../user/user.dto';

export class AccessTokenAndUserDto {
  @ApiProperty({
    type: String,
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk2NjIxNTksImV4cCI6MTYxOTc0ODU1OX0.Uu6kvUdHbxoVV6rPUrpLh_Ev7NtDOf44qKvkLibW3Xs',
  })
  @Expose()
  readonly accessToken: string;

  @ApiProperty({
    type: UserDto,
    description: 'Dados do usuário',
  })
  @Expose()
  readonly user: UserDto;

  constructor(obj: AccessTokenAndUserDto) {
    Object.assign(
      this,
      plainToClass(AccessTokenAndUserDto, obj, { excludeExtraneousValues: true }),
    );
  }
}
