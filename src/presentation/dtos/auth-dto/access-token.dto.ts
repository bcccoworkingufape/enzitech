import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class AccessTokenDto {
  @ApiProperty({
    type: String,
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTk2NjIxNTksImV4cCI6MTYxOTc0ODU1OX0.Uu6kvUdHbxoVV6rPUrpLh_Ev7NtDOf44qKvkLibW3Xs',
  })
  @Expose()
  readonly accessToken: string;

  constructor(obj: AccessTokenDto) {
    Object.assign(this, plainToClass(AccessTokenDto, obj, { excludeExtraneousValues: true }));
  }
}
