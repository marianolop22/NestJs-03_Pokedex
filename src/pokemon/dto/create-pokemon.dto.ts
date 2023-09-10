import { Transform } from 'class-transformer';
import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';


export class CreatePokemonDto {

  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @IsString()
  @MinLength(3)
  @Transform((param) => param.value.toLowerCase())
  name: string;

}
