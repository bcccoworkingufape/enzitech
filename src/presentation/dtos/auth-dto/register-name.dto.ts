import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class RegisterNameDto {
  @ApiProperty({
    type: String,
    description: `User's name to be registered.`,
    example: 'Maria',
  })
  @IsNotEmpty({ message: `'nome' não pode ser vazio.` })
  @Expose()
  readonly name: string;

  constructor(obj: RegisterNameDto) {
    Object.assign(this, plainToClass(RegisterNameDto, obj, { excludeExtraneousValues: true }));
  }
}
