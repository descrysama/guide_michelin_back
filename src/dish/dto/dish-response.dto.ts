import { ApiProperty } from '@nestjs/swagger';

export class DishResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  sourceKey!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  caption!: string;

  @ApiProperty()
  image!: string;

  @ApiProperty()
  cuisine!: string;

  @ApiProperty()
  mood!: string;

  @ApiProperty()
  budget!: string;

  @ApiProperty()
  prepTime!: number;

  @ApiProperty()
  vegan!: boolean;

  @ApiProperty({ type: [String] })
  ingredients!: string[];

  @ApiProperty({ type: [String] })
  allergens!: string[];

  @ApiProperty({ type: [String] })
  tags!: string[];

  @ApiProperty()
  restaurantId!: string;

  @ApiProperty()
  restaurantName!: string;

  @ApiProperty()
  restaurantAddress!: string;

  @ApiProperty()
  restaurantHours!: string;

  @ApiProperty({ required: false })
  restaurantPhone?: string | null;

  @ApiProperty({ required: false })
  sourceUrl?: string | null;
}

