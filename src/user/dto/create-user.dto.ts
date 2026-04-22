import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'First name', example: 'Jean' })
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty({ description: 'Last name', example: 'Dupont' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: 'Email address', example: 'jean.dupont@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password (minimum 6 characters)', example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Phone number', example: '+33123456789', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ description: 'About me description', example: 'Food lover and chef', required: false })
  @IsString()
  @IsOptional()
  aboutMe?: string;
}