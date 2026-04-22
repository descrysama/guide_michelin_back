import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertFavoriteDto {
  @ApiProperty({ example: 'dish-1' })
  @IsString()
  @IsNotEmpty()
  dishId!: string;

  @ApiProperty({ example: 'Ramen Tonkotsu' })
  @IsString()
  @IsNotEmpty()
  dishTitle!: string;

  @ApiProperty({ example: 'Bouillon longuement réduit, noodles fraîches, œuf mariné' })
  @IsString()
  @IsNotEmpty()
  dishCaption!: string;

  @ApiProperty({ example: 'https://example.com/ramen.jpg' })
  @IsString()
  @IsNotEmpty()
  dishImage!: string;

  @ApiProperty({ example: 'Japonais' })
  @IsString()
  @IsNotEmpty()
  dishCuisine!: string;

  @ApiProperty({ example: 'Izakaya Kuma' })
  @IsString()
  @IsNotEmpty()
  restaurantName!: string;

  @ApiProperty({ example: '12 rue des Halles, Paris' })
  @IsString()
  @IsNotEmpty()
  restaurantAddress!: string;

  @ApiProperty({ example: 'Lun-Dim 12:00-23:00' })
  @IsString()
  @IsNotEmpty()
  restaurantHours!: string;

  @ApiPropertyOptional({ example: '+33123456789' })
  @IsOptional()
  @IsString()
  restaurantPhone?: string;
}
