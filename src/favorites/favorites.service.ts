import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertFavoriteDto } from './dto/upsert-favorite.dto';
import { UpsertRestaurantFavoriteDto } from './dto/upsert-restaurant-favorite.dto';
import { UpsertHotelFavoriteDto } from './dto/upsert-hotel-favorite.dto';
import { UpsertExperienceFavoriteDto } from './dto/upsert-experience-favorite.dto';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const makeId = () => `fav_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  private async resolveRestaurantId(dto: UpsertFavoriteDto): Promise<string | null> {
    if (dto.restaurantId) return dto.restaurantId;
    if (dto.restaurantI) return dto.restaurantI;

    const dish = await this.prisma.dish.findUnique({
      where: { id: dto.dishId },
      select: { restaurantId: true },
    });
    if (dish?.restaurantId) return dish.restaurantId;

    const byName = await this.prisma.restaurant.findFirst({
      where: { nom: { contains: dto.restaurantName } },
      select: { id: true },
    });
    if (byName?.id) return byName.id;

    return null;
  }

  async listForUser(userId: string) {
    return this.prisma.userDishFavorite.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async listRestaurantFavoritesForUser(userId: string) {
    return this.prisma.$queryRawUnsafe(
      'SELECT * FROM "user_restaurant_favorites" WHERE "userId" = ? ORDER BY "updatedAt" DESC',
      userId,
    );
  }

  async listHotelFavoritesForUser(userId: string) {
    return this.prisma.$queryRawUnsafe(
      'SELECT * FROM "user_hotel_favorites" WHERE "userId" = ? ORDER BY "updatedAt" DESC',
      userId,
    );
  }

  async listExperienceFavoritesForUser(userId: string) {
    return this.prisma.$queryRawUnsafe(
      'SELECT * FROM "user_experience_favorites" WHERE "userId" = ? ORDER BY "updatedAt" DESC',
      userId,
    );
  }

  async getOne(userId: string, dishId: string) {
    const favorite = await this.prisma.userDishFavorite.findUnique({
      where: { userId_dishId: { userId, dishId } },
    });

    if (!favorite) {
      throw new NotFoundException('Favori introuvable');
    }

    return favorite;
  }

  async upsert(userId: string, dto: UpsertFavoriteDto) {
    const expiresAt = new Date(Date.now() + ONE_DAY_MS);
    const restaurantId = await this.resolveRestaurantId(dto);

    const createData = {
      userId,
      dishId: dto.dishId,
      restaurantId,
      dishTitle: dto.dishTitle,
      dishCaption: dto.dishCaption,
      dishImage: dto.dishImage,
      dishCuisine: dto.dishCuisine,
      restaurantName: dto.restaurantName,
      restaurantAddress: dto.restaurantAddress,
      restaurantHours: dto.restaurantHours,
      restaurantPhone: dto.restaurantPhone,
      expiresAt,
    };

    const updateData = {
      restaurantId,
      dishTitle: dto.dishTitle,
      dishCaption: dto.dishCaption,
      dishImage: dto.dishImage,
      dishCuisine: dto.dishCuisine,
      restaurantName: dto.restaurantName,
      restaurantAddress: dto.restaurantAddress,
      restaurantHours: dto.restaurantHours,
      restaurantPhone: dto.restaurantPhone,
      expiresAt,
    };

    return this.prisma.userDishFavorite.upsert({
      where: { userId_dishId: { userId, dishId: dto.dishId } },
      create: createData,
      update: updateData,
    });
  }

  async upsertRestaurant(userId: string, dto: UpsertRestaurantFavoriteDto) {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { id: dto.restaurantId } });
    if (!restaurant) throw new NotFoundException('Restaurant introuvable');

    const imageUrls = JSON.parse(restaurant.imageUrls) as string[];
    const now = new Date().toISOString();

    await this.prisma.$executeRawUnsafe(
      `INSERT INTO "user_restaurant_favorites" ("id","userId","restaurantId","restaurantName","restaurantImage","restaurantAddress","createdAt","updatedAt")
       VALUES (?,?,?,?,?,?,?,?)
       ON CONFLICT("userId","restaurantId")
       DO UPDATE SET "restaurantName" = excluded."restaurantName", "restaurantImage" = excluded."restaurantImage", "restaurantAddress" = excluded."restaurantAddress", "updatedAt" = excluded."updatedAt"`,
      makeId(),
      userId,
      restaurant.id,
      restaurant.nom,
      imageUrls[0] ?? null,
      restaurant.adresse,
      now,
      now,
    );

    return { ok: true };
  }

  async upsertHotel(userId: string, dto: UpsertHotelFavoriteDto) {
    const now = new Date().toISOString();
    await this.prisma.$executeRawUnsafe(
      `INSERT INTO "user_hotel_favorites" ("id","userId","hotelKey","hotelName","hotelImage","hotelUrl","hotelLocationSlug","createdAt","updatedAt")
       VALUES (?,?,?,?,?,?,?,?,?)
       ON CONFLICT("userId","hotelKey")
       DO UPDATE SET "hotelName" = excluded."hotelName", "hotelImage" = excluded."hotelImage", "hotelUrl" = excluded."hotelUrl", "hotelLocationSlug" = excluded."hotelLocationSlug", "updatedAt" = excluded."updatedAt"`,
      makeId(),
      userId,
      dto.hotelKey,
      dto.hotelName,
      dto.hotelImage,
      dto.hotelUrl,
      dto.hotelLocationSlug ?? null,
      now,
      now,
    );

    return { ok: true };
  }

  async upsertExperience(userId: string, dto: UpsertExperienceFavoriteDto) {
    const rows = (await this.prisma.$queryRawUnsafe(
      'SELECT * FROM "experiences" WHERE "id" = ? LIMIT 1',
      dto.experienceId,
    )) as any[];
    const experience = rows[0];
    if (!experience) throw new NotFoundException('Expérience introuvable');

    const now = new Date().toISOString();
    await this.prisma.$executeRawUnsafe(
      `INSERT INTO "user_experience_favorites" ("id","userId","experienceId","experienceTitle","experienceImage","experienceCity","experiencePrice","createdAt","updatedAt")
       VALUES (?,?,?,?,?,?,?,?,?)
       ON CONFLICT("userId","experienceId")
       DO UPDATE SET "experienceTitle" = excluded."experienceTitle", "experienceImage" = excluded."experienceImage", "experienceCity" = excluded."experienceCity", "experiencePrice" = excluded."experiencePrice", "updatedAt" = excluded."updatedAt"`,
      makeId(),
      userId,
      experience.id,
      experience.title,
      experience.imageUrl,
      experience.city,
      experience.priceEur,
      now,
      now,
    );

    return { ok: true };
  }

  async extend(userId: string, dishId: string) {
    const favorite = await this.getOne(userId, dishId);
    const now = Date.now();
    const base = favorite.expiresAt.getTime() > now ? favorite.expiresAt.getTime() : now;
    const expiresAt = new Date(base + ONE_DAY_MS);

    return this.prisma.userDishFavorite.update({
      where: { userId_dishId: { userId, dishId } },
      data: { expiresAt },
    });
  }

  async deleteOne(userId: string, dishId: string) {
    await this.getOne(userId, dishId);
    await this.prisma.userDishFavorite.delete({ where: { userId_dishId: { userId, dishId } } });
    return { message: 'Favori supprimé' };
  }

  async deleteRestaurant(userId: string, restaurantId: string) {
    await this.prisma.$executeRawUnsafe(
      'DELETE FROM "user_restaurant_favorites" WHERE "userId" = ? AND "restaurantId" = ?',
      userId,
      restaurantId,
    );
    return { message: 'Restaurant favori supprimé' };
  }

  async deleteHotel(userId: string, hotelKey: string) {
    await this.prisma.$executeRawUnsafe(
      'DELETE FROM "user_hotel_favorites" WHERE "userId" = ? AND "hotelKey" = ?',
      userId,
      hotelKey,
    );
    return { message: 'Hôtel favori supprimé' };
  }

  async deleteExperience(userId: string, experienceId: string) {
    await this.prisma.$executeRawUnsafe(
      'DELETE FROM "user_experience_favorites" WHERE "userId" = ? AND "experienceId" = ?',
      userId,
      experienceId,
    );
    return { message: 'Expérience favorite supprimée' };
  }

  async clear(userId: string) {
    await this.prisma.userDishFavorite.deleteMany({ where: { userId } });
    return { message: 'Liste des favoris plats vidée' };
  }

  async clearRestaurants(userId: string) {
    await this.prisma.$executeRawUnsafe('DELETE FROM "user_restaurant_favorites" WHERE "userId" = ?', userId);
    return { message: 'Liste des favoris restaurants vidée' };
  }

  async clearHotels(userId: string) {
    await this.prisma.$executeRawUnsafe('DELETE FROM "user_hotel_favorites" WHERE "userId" = ?', userId);
    return { message: 'Liste des favoris hôtels vidée' };
  }

  async clearExperiences(userId: string) {
    await this.prisma.$executeRawUnsafe('DELETE FROM "user_experience_favorites" WHERE "userId" = ?', userId);
    return { message: 'Liste des favoris expériences vidée' };
  }
}
