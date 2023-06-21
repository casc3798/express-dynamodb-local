import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsNumber()
  birthYear: number;
}

export class UpdatePetDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  species: string;

  @IsNumber()
  @IsOptional()
  birthYear: number;
}
