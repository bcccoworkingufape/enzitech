import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../shared/pagination.dto';
import { UserRole } from './enums/user-role.enum';

export class ListUserFilterDto extends PaginationDto {
  @ApiProperty({
    type: String,
    description: 'Name filter',
    example: 'Maria',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Expose()
  readonly name?: string | null;

  @ApiProperty({
    type: String,
    description: 'Password filter',
    example: 'maria@email.com.br',
    required: false,
  })
  @IsOptional()
  @Expose()
  readonly email?: string | null;

  @ApiProperty({
    type: String,
    description: `User's role`,
    example: 'Admin',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  @Transform(({ value }) => (value ? UserRole[value as keyof typeof UserRole] : value))
  @Expose()
  readonly role?: UserRole | null;

  @ApiProperty({
    type: String,
    description: 'Search users by initial Date.String pattern: year-mounth-day',
    required: false,
    example: '2021-11-10',
  })
  @IsString()
  @IsOptional()
  @Expose()
  readonly initialDate?: string | null;

  @ApiProperty({
    type: String,
    description: 'Search users by final Date. String pattern: year-mounth-day',
    required: false,
    example: '2021-11-12',
  })
  @IsString()
  @IsOptional()
  @Expose()
  readonly finalDate?: string | null;

  constructor(obj: ListUserFilterDto) {
    super(obj);
    Object.assign(this, plainToClass(ListUserFilterDto, obj, { excludeExtraneousValues: true }));
  }
}
