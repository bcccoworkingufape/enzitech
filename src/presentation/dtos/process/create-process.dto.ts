import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateProcessDto {
  @ApiProperty({
    type: String,
    description: 'Name of process',
    required: true,
    example: 'Processo 1',
  })
  @IsString()
  @Expose()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Process description',
    example: 'descrição do processo informado',
    required: true,
  })
  @IsString()
  @Expose()
  readonly description: string;


  constructor(obj: CreateProcessDto) {
    Object.assign(this, plainToClass(CreateProcessDto, obj, { excludeExtraneousValues: true }));
  }
}
