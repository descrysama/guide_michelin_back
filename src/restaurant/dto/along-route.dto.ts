import { IsArray, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AlongRouteDto {
  @ApiProperty({
    description: 'Coordonnées GeoJSON du trajet — tableau de [lng, lat]',
    example: [[2.3488, 48.8534], [4.8357, 45.7640]],
  })
  @IsArray()
  coordinates: [number, number][];

  @ApiPropertyOptional({ description: 'Distance max au trajet en km (défaut 15)', default: 15 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  maxDistanceKm?: number;

  @ApiPropertyOptional({ description: 'Filtrer par nombre d\'étoiles (1, 2 ou 3)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(3)
  @Type(() => Number)
  distinction?: number;
}
