import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Type } from 'class-transformer';
import { IsInt, Min, Max, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt({ message: 'Page must be an integer value' })
  @Min(1, { message: 'Page must be at least 1' })
  @Type(()=>Number)
  page: number = 1;

  @IsOptional()
  @IsInt({ message: 'Limit must be an integer value' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot be greater than 100' })
  @Type(()=>Number)
  limit: number = 10;
}
