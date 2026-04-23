import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

const toOptionalNumber = ({ value }: { value: unknown }) => {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : value;
};

const toOptionalBoolean = ({ value }: { value: unknown }) => {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'boolean') return value;
  const normalized = String(value).toLowerCase();
  if (normalized === 'true' || normalized === '1') return true;
  if (normalized === 'false' || normalized === '0') return false;
  return value;
};

export class ExperienceQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @Transform(toOptionalNumber)
  @IsNumber()
  lat?: number;

  @IsOptional()
  @Transform(toOptionalNumber)
  @IsNumber()
  lng?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  range?: number = 25;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(60)
  limit?: number = 30;

  @IsOptional()
  @Transform(toOptionalBoolean)
  @IsBoolean()
  featured?: boolean;
}

