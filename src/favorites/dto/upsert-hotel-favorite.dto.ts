import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpsertHotelFavoriteDto {
  @ApiProperty({ example: 'hotel_the_twenty_two_12713' })
  @IsString()
  @IsNotEmpty()
  hotelKey!: string;

  @ApiProperty({ example: 'The Twenty Two' })
  @IsString()
  @IsNotEmpty()
  hotelName!: string;

  @ApiProperty({ example: 'https://example.com/hotel.jpg' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  hotelImage!: string;

  @ApiProperty({ example: 'https://guide.michelin.com/fr/fr/hotels-stays/london/the-twenty-two-12713' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  hotelUrl!: string;

  @ApiPropertyOptional({ example: 'london' })
  @IsOptional()
  @IsString()
  hotelLocationSlug?: string;
}
