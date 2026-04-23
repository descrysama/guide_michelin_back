import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpsertFavoriteDto } from './dto/upsert-favorite.dto';
import { FavoritesService } from './favorites.service';
import { UpsertRestaurantFavoriteDto } from './dto/upsert-restaurant-favorite.dto';
import { UpsertHotelFavoriteDto } from './dto/upsert-hotel-favorite.dto';
import { UpsertExperienceFavoriteDto } from './dto/upsert-experience-favorite.dto';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'List user dish favorites' })
  @ApiResponse({ status: 200, description: 'Favorites retrieved successfully' })
  async list(@Req() req: Request) {
    return this.favoritesService.listForUser((req.user as any).id);
  }

  @Get('dishes')
  async listDishes(@Req() req: Request) {
    return this.favoritesService.listForUser((req.user as any).id);
  }

  @Get('restaurants')
  async listRestaurants(@Req() req: Request) {
    return this.favoritesService.listRestaurantFavoritesForUser((req.user as any).id);
  }

  @Get('hotels')
  async listHotels(@Req() req: Request) {
    return this.favoritesService.listHotelFavoritesForUser((req.user as any).id);
  }

  @Get('experiences')
  async listExperiences(@Req() req: Request) {
    return this.favoritesService.listExperienceFavoritesForUser((req.user as any).id);
  }

  @Get(':dishId')
  @ApiOperation({ summary: 'Get one favorite dish by dish id' })
  @ApiResponse({ status: 200, description: 'Favorite retrieved successfully' })
  async getOne(@Req() req: Request, @Param('dishId') dishId: string) {
    return this.favoritesService.getOne((req.user as any).id, dishId);
  }

  @Post()
  @ApiOperation({ summary: 'Create or refresh a dish favorite for 24h' })
  @ApiBody({ type: UpsertFavoriteDto })
  @ApiResponse({ status: 201, description: 'Favorite saved successfully' })
  async upsert(@Req() req: Request, @Body(ValidationPipe) dto: UpsertFavoriteDto) {
    return this.favoritesService.upsert((req.user as any).id, dto);
  }

  @Post('restaurants')
  @ApiBody({ type: UpsertRestaurantFavoriteDto })
  async upsertRestaurant(@Req() req: Request, @Body(ValidationPipe) dto: UpsertRestaurantFavoriteDto) {
    return this.favoritesService.upsertRestaurant((req.user as any).id, dto);
  }

  @Post('hotels')
  @ApiBody({ type: UpsertHotelFavoriteDto })
  async upsertHotel(@Req() req: Request, @Body(ValidationPipe) dto: UpsertHotelFavoriteDto) {
    return this.favoritesService.upsertHotel((req.user as any).id, dto);
  }

  @Post('experiences')
  @ApiBody({ type: UpsertExperienceFavoriteDto })
  async upsertExperience(@Req() req: Request, @Body(ValidationPipe) dto: UpsertExperienceFavoriteDto) {
    return this.favoritesService.upsertExperience((req.user as any).id, dto);
  }

  @Patch(':dishId/extend')
  @ApiOperation({ summary: 'Extend favorite expiration by 24h' })
  @ApiResponse({ status: 200, description: 'Favorite extended successfully' })
  async extend(@Req() req: Request, @Param('dishId') dishId: string) {
    return this.favoritesService.extend((req.user as any).id, dishId);
  }

  @Delete('restaurants/:restaurantId')
  async deleteRestaurant(@Req() req: Request, @Param('restaurantId') restaurantId: string) {
    return this.favoritesService.deleteRestaurant((req.user as any).id, restaurantId);
  }

  @Delete('hotels/:hotelKey')
  async deleteHotel(@Req() req: Request, @Param('hotelKey') hotelKey: string) {
    return this.favoritesService.deleteHotel((req.user as any).id, hotelKey);
  }

  @Delete('experiences/:experienceId')
  async deleteExperience(@Req() req: Request, @Param('experienceId') experienceId: string) {
    return this.favoritesService.deleteExperience((req.user as any).id, experienceId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear all dish favorites for current user' })
  @ApiResponse({ status: 200, description: 'Favorites cleared successfully' })
  async clear(@Req() req: Request) {
    return this.favoritesService.clear((req.user as any).id);
  }

  @Delete('restaurants')
  async clearRestaurants(@Req() req: Request) {
    return this.favoritesService.clearRestaurants((req.user as any).id);
  }

  @Delete('hotels')
  async clearHotels(@Req() req: Request) {
    return this.favoritesService.clearHotels((req.user as any).id);
  }

  @Delete('experiences')
  async clearExperiences(@Req() req: Request) {
    return this.favoritesService.clearExperiences((req.user as any).id);
  }

  @Delete(':dishId')
  @ApiOperation({ summary: 'Delete one dish favorite' })
  @ApiResponse({ status: 200, description: 'Favorite deleted successfully' })
  async deleteOne(@Req() req: Request, @Param('dishId') dishId: string) {
    return this.favoritesService.deleteOne((req.user as any).id, dishId);
  }
}
