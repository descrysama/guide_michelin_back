import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class DishQueryDto {
  @ApiPropertyOptional({ description: 'Filtre cuisine', example: 'Français' })
  @IsOptional()
  @IsString()
  cuisine?: string;

  @ApiPropertyOptional({ description: 'Filtre mood', example: 'Date' })
  @IsOptional()
  @IsString()
  mood?: string;

  @ApiPropertyOptional({ description: 'Uniquement vegan', example: true })
  @IsOptional()
  veganOnly?: string;

  @ApiPropertyOptional({ description: 'Ingrédients exclus (CSV)', example: 'porc,champignon' })
  @IsOptional()
  @IsString()
  excludedIngredients?: string;

  @ApiPropertyOptional({ description: 'Allergènes exclus (CSV)', example: 'gluten,arachides' })
  @IsOptional()
  @IsString()
  allergens?: string;

  @ApiPropertyOptional({ description: 'Tags exclus (CSV)', example: 'epice,frit' })
  @IsOptional()
  @IsString()
  excludedTags?: string;

  @ApiPropertyOptional({ description: 'Nombre de plats', example: 50, default: 80 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  limit?: number;

  @ApiPropertyOptional({ description: 'Décalage', example: 0, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;
}

