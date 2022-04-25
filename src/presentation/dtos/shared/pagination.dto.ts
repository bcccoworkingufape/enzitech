import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Expose, plainToClass, Transform } from 'class-transformer';

@Injectable()
export class PaginationDto {
  @ApiProperty({
    type: Number,
    description: 'Page number (index-1)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? parseInt(value, 10) : value))
  @Expose()
  readonly page?: number | null;

  @ApiProperty({
    type: String,
    description: 'Property to order by',
    example: 'name',
    required: false,
  })
  @IsOptional()
  @Expose()
  readonly orderBy?: string | null;

  @ApiProperty({
    type: String,
    description: `Specifies if ordering is ascending or descending. Possible values: 'ASC' or 'DESC'. Default is 'ASC'.`,
    example: 'ASC',
    required: false,
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @Expose()
  readonly ordering?: 'ASC' | 'DESC' | null;

  @ApiProperty({
    type: Number,
    description: 'Element limit per page (default: 10)',
    example: 20,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? parseInt(value, 10) : value))
  @Expose()
  readonly limit?: number | null;

  constructor(obj: PaginationDto) {
    Object.assign(this, plainToClass(PaginationDto, obj, { excludeExtraneousValues: true }));
  }
}
