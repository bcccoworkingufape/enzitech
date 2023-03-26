import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsString } from 'class-validator';

export class VerifyEnzymeDto {
  @ApiProperty({
    type: String,
    description: 'Name of process',
    required: true,
    example: '25a243db-1008-4268-a08b-efb7429f6bfa',
  })
  @IsString()
  @Expose()
  readonly process: string;

  constructor(obj: VerifyEnzymeDto) {
    Object.assign(this, plainToClass(VerifyEnzymeDto, obj, { excludeExtraneousValues: true }));
  }
}
