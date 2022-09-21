import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass, Transform } from 'class-transformer';
import { IsBoolean,  IsOptional } from 'class-validator';
import { PaginationDto } from '../shared/pagination.dto';

export class ListExperimentFilterDto extends PaginationDto {
  @ApiProperty({
    type: Boolean,
    description: 'Filter if experiment is finished',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => {
    if (!value || value !== 'true') {
      return false;
    }
    return true;
  })
  readonly finished?: boolean | null;

  constructor(obj: ListExperimentFilterDto) {
    super(obj);
    Object.assign(this, plainToClass(ListExperimentFilterDto, obj, { excludeExtraneousValues: true }));
  }
}
