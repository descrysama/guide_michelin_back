import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertRestaurantFavoriteDto {
  @ApiProperty({ example: 'cmo9wku1n000qxmiwz7gjhkru' })
  @IsString()
  @IsNotEmpty()
  restaurantId!: string;
}
