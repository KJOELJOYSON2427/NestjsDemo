import { Type } from "class-transformer";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { PaginationQueryDto } from "../../common/dto/pagination-query-dto";


export class FindPostsQueryDto extends PaginationQueryDto {
  @Type(() => String)
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title?: string;
}
