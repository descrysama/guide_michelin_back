import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserPreferencesDto {
  @ApiPropertyOptional({ description: 'Limiter aux plats vegan', example: true })
  @IsOptional()
  @IsBoolean()
  veganOnly?: boolean;

  @ApiPropertyOptional({
    description: 'Aliments totalement refusés',
    example: ['porc', 'champignon'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excludedIngredients?: string[];

  @ApiPropertyOptional({
    description: 'Allergènes à exclure',
    example: ['gluten', 'arachides'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergens?: string[];

  @ApiPropertyOptional({
    description: 'Tags à exclure (ex: spicy, seafood)',
    example: ['seafood'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excludedTags?: string[];
}
