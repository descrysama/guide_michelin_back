import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DishQueryDto } from './dto/dish-query.dto';

export type DishResult = {
  id: string;
  sourceKey: string;
  title: string;
  caption: string;
  image: string;
  cuisine: string;
  mood: string;
  budget: string;
  prepTime: number;
  vegan: boolean;
  ingredients: string[];
  allergens: string[];
  tags: string[];
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantHours: string;
  restaurantPhone?: string | null;
  sourceUrl?: string | null;
};

function safeJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeTokens(input?: string): string[] {
  return (input ?? '')
    .split(',')
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

function containsToken(values: string[], excluded: string[]): boolean {
  if (excluded.length === 0) return false;
  const normalized = values.map((value) => value.toLowerCase());
  return excluded.some((token) => normalized.some((candidate) => candidate.includes(token)));
}

@Injectable()
export class DishRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDto(raw: any): DishResult {
    const horaires = (raw.restaurant?.horaires ?? [])
      .map((h: any) => {
        const slots = safeJsonArray(h.creneaux)
          .map((slot: any) => `${slot.ouverture}-${slot.fermeture}`)
          .join(', ');
        return `${h.jour}: ${slots}`;
      })
      .join(' · ');

    return {
      id: raw.id,
      sourceKey: raw.sourceKey,
      title: raw.title,
      caption: raw.caption,
      image: raw.imageUrl,
      cuisine: raw.cuisine,
      mood: raw.mood,
      budget: raw.budget,
      prepTime: raw.prepTime,
      vegan: raw.vegan,
      ingredients: safeJsonArray(raw.ingredients),
      allergens: safeJsonArray(raw.allergens),
      tags: safeJsonArray(raw.tags),
      restaurantId: raw.restaurantId,
      restaurantName: raw.restaurant?.nom ?? '',
      restaurantAddress: raw.restaurant?.adresse ?? '',
      restaurantHours: horaires,
      restaurantPhone: null,
      sourceUrl: raw.sourceUrl,
    };
  }

  async findAll(query: DishQueryDto): Promise<DishResult[]> {
    const { cuisine, mood } = query;
    const limit = query.limit ?? 80;
    const offset = query.offset ?? 0;

    const excludedIngredients = normalizeTokens(query.excludedIngredients);
    const excludedAllergens = normalizeTokens(query.allergens);
    const excludedTags = normalizeTokens(query.excludedTags);
    const veganOnly = String(query.veganOnly).toLowerCase() === 'true';

    const raws = await this.prisma.dish.findMany({
      where: {
        ...(cuisine ? { cuisine: { contains: cuisine } } : {}),
        ...(mood ? { mood: { contains: mood } } : {}),
        ...(veganOnly ? { vegan: true } : {}),
      },
      include: {
        restaurant: {
          include: {
            horaires: true,
          },
        },
      },
      orderBy: [{ updatedAt: 'desc' }],
      skip: offset,
      take: limit,
    });

    return raws
      .map((raw) => this.toDto(raw))
      .filter((dish) => {
        if (containsToken(dish.ingredients, excludedIngredients)) return false;
        if (containsToken(dish.allergens, excludedAllergens)) return false;
        if (containsToken(dish.tags, excludedTags)) return false;
        return true;
      });
  }

  async findById(id: string): Promise<DishResult | null> {
    const raw = await this.prisma.dish.findUnique({
      where: { id },
      include: {
        restaurant: {
          include: {
            horaires: true,
          },
        },
      },
    });

    return raw ? this.toDto(raw) : null;
  }
}

