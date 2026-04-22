import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RestaurantQueryDto {
  @ApiPropertyOptional({ description: 'Recherche par nom', example: 'Guy' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Latitude du point de référence', example: 48.8566 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat?: number;

  @ApiPropertyOptional({ description: 'Longitude du point de référence', example: 2.3522 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng?: number;

  @ApiPropertyOptional({ description: 'Rayon de recherche en km (défaut : 15)', example: 15 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(500)
  range?: number;

  @ApiPropertyOptional({ description: 'Filtre par distinction (1, 2 ou 3 étoiles)', example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(3)
  distinction?: number;
}
