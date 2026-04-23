import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, IsOptional, Max, Min, ValidateNested } from 'class-validator';

class CoordinateDto {
  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;
}

export class AlongRouteExperienceDto {
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CoordinateDto)
  coordinates: CoordinateDto[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  maxDistanceKm?: number = 15;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}

