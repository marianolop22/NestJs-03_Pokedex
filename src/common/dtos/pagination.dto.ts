import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';


export class PaginationDto {

  @IsOptional()
  @IsPositive()
  @Min(1)
  // @Transform((param) => +param.value)
  limit?: number;
  
  @IsOptional()
  @IsPositive()
  // @Min(0)
  // @Transform((param) => +param.value)
  offset?: number;
}
