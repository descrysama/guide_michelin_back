import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreneauDto {
  @ApiProperty({ example: '12:00' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'Format attendu HH:MM' })
  ouverture: string;

  @ApiProperty({ example: '14:30' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'Format attendu HH:MM' })
  fermeture: string;
}

export class HoraireDto {
  @ApiProperty({
    enum: ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'],
  })
  @IsIn(['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE'])
  jour: string;

  @ApiProperty({ type: [CreneauDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreneauDto)
  creneaux: CreneauDto[];
}

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Le Bernardin' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({
    type: [String],
    example: ['https://example.com/photo1.jpg'],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  imageUrls: string[];

  @ApiProperty({ example: '15 Rue du Faubourg Saint-Antoine, Paris' })
  @IsString()
  @IsNotEmpty()
  adresse: string;

  @ApiProperty({ enum: [1, 2, 3], description: 'Nombre d\'étoiles Michelin' })
  @IsInt()
  @IsIn([1, 2, 3])
  distinction: number;

  @ApiProperty({ type: [HoraireDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HoraireDto)
  horaires: HoraireDto[];

  @ApiProperty({ example: 48.8578, required: false })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiProperty({ example: 2.3394, required: false })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;
}
