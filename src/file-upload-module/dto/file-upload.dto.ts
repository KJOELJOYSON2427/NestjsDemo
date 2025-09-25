import { IsOptional, IsString, MaxLength } from "class-validator";


export class UploadFileDto {
  @IsOptional()
  @IsString({ message:"Should be String"})
  @MaxLength(500)
  description?: string;
}
