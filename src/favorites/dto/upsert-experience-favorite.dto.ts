import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpsertExperienceFavoriteDto {
  @ApiProperty({
    description: 'Experience id',
    example: 'cmexp0001234abcd',
  })
  @IsString()
  experienceId: string;
}

