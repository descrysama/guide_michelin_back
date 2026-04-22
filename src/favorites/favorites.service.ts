import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertFavoriteDto } from './dto/upsert-favorite.dto';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async listForUser(userId: string) {
    return this.prisma.userDishFavorite.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
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

    return this.prisma.userDishFavorite.upsert({
      where: { userId_dishId: { userId, dishId: dto.dishId } },
      create: {
        userId,
        dishId: dto.dishId,
        dishTitle: dto.dishTitle,
        dishCaption: dto.dishCaption,
        dishImage: dto.dishImage,
        dishCuisine: dto.dishCuisine,
        restaurantName: dto.restaurantName,
        restaurantAddress: dto.restaurantAddress,
        restaurantHours: dto.restaurantHours,
        restaurantPhone: dto.restaurantPhone,
        expiresAt,
      },
      update: {
        dishTitle: dto.dishTitle,
        dishCaption: dto.dishCaption,
        dishImage: dto.dishImage,
        dishCuisine: dto.dishCuisine,
        restaurantName: dto.restaurantName,
        restaurantAddress: dto.restaurantAddress,
        restaurantHours: dto.restaurantHours,
        restaurantPhone: dto.restaurantPhone,
        expiresAt,
      },
    });
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
    await this.prisma.userDishFavorite.delete({
      where: { userId_dishId: { userId, dishId } },
    });
    return { message: 'Favori supprimé' };
  }

  async clear(userId: string) {
    await this.prisma.userDishFavorite.deleteMany({ where: { userId } });
    return { message: 'Liste des favoris vidée' };
  }
}
