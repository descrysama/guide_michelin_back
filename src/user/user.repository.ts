import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';

type StoredPreferencesRow = {
  userId: string;
  veganOnly: number;
  excludedIngredients: string;
  allergens: string;
  excludedTags: string;
  updatedAt: string;
};

export type UserPreferences = {
  veganOnly: boolean;
  excludedIngredients: string[];
  allergens: string[];
  excludedTags: string[];
  updatedAt?: string;
};

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  private async ensurePreferencesTable(): Promise<void> {
    await this.prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS user_preferences (
        userId TEXT PRIMARY KEY,
        veganOnly INTEGER NOT NULL DEFAULT 0,
        excludedIngredients TEXT NOT NULL DEFAULT '[]',
        allergens TEXT NOT NULL DEFAULT '[]',
        excludedTags TEXT NOT NULL DEFAULT '[]',
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
  }

  private safeJsonArray(value: string | null | undefined): string[] {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
    } catch {
      return [];
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async getPreferences(userId: string): Promise<UserPreferences> {
    await this.ensurePreferencesTable();
    const rows = await this.prisma.$queryRawUnsafe<StoredPreferencesRow[]>(
      `SELECT userId, veganOnly, excludedIngredients, allergens, excludedTags, updatedAt FROM user_preferences WHERE userId = ?`,
      userId,
    );

    const row = rows[0];
    if (!row) {
      return {
        veganOnly: false,
        excludedIngredients: [],
        allergens: [],
        excludedTags: [],
      };
    }

    return {
      veganOnly: Boolean(row.veganOnly),
      excludedIngredients: this.safeJsonArray(row.excludedIngredients),
      allergens: this.safeJsonArray(row.allergens),
      excludedTags: this.safeJsonArray(row.excludedTags),
      updatedAt: row.updatedAt,
    };
  }

  async updatePreferences(userId: string, dto: UpdateUserPreferencesDto): Promise<UserPreferences> {
    await this.ensurePreferencesTable();

    const payload = {
      veganOnly: dto.veganOnly ?? false,
      excludedIngredients: JSON.stringify(dto.excludedIngredients ?? []),
      allergens: JSON.stringify(dto.allergens ?? []),
      excludedTags: JSON.stringify(dto.excludedTags ?? []),
    };

    await this.prisma.$executeRawUnsafe(
      `
      INSERT INTO user_preferences (userId, veganOnly, excludedIngredients, allergens, excludedTags, updatedAt)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(userId) DO UPDATE SET
        veganOnly = excluded.veganOnly,
        excludedIngredients = excluded.excludedIngredients,
        allergens = excluded.allergens,
        excludedTags = excluded.excludedTags,
        updatedAt = CURRENT_TIMESTAMP
      `,
      userId,
      payload.veganOnly ? 1 : 0,
      payload.excludedIngredients,
      payload.allergens,
      payload.excludedTags,
    );

    return this.getPreferences(userId);
  }
}
