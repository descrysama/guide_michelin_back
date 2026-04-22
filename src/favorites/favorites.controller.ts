import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpsertFavoriteDto } from './dto/upsert-favorite.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'List user favorites' })
  @ApiResponse({ status: 200, description: 'Favorites retrieved successfully' })
  async list(@Req() req: Request) {
    return this.favoritesService.listForUser((req.user as any).id);
  }

  @Get(':dishId')
  @ApiOperation({ summary: 'Get one favorite by dish id' })
  @ApiResponse({ status: 200, description: 'Favorite retrieved successfully' })
  async getOne(@Req() req: Request, @Param('dishId') dishId: string) {
    return this.favoritesService.getOne((req.user as any).id, dishId);
  }

  @Post()
  @ApiOperation({ summary: 'Create or refresh a favorite for 24h' })
  @ApiBody({ type: UpsertFavoriteDto })
  @ApiResponse({ status: 201, description: 'Favorite saved successfully' })
  async upsert(@Req() req: Request, @Body(ValidationPipe) dto: UpsertFavoriteDto) {
    return this.favoritesService.upsert((req.user as any).id, dto);
  }

  @Patch(':dishId/extend')
  @ApiOperation({ summary: 'Extend favorite expiration by 24h' })
  @ApiResponse({ status: 200, description: 'Favorite extended successfully' })
  async extend(@Req() req: Request, @Param('dishId') dishId: string) {
    return this.favoritesService.extend((req.user as any).id, dishId);
  }

  @Delete(':dishId')
  @ApiOperation({ summary: 'Delete one favorite' })
  @ApiResponse({ status: 200, description: 'Favorite deleted successfully' })
  async deleteOne(@Req() req: Request, @Param('dishId') dishId: string) {
    return this.favoritesService.deleteOne((req.user as any).id, dishId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear all favorites for current user' })
  @ApiResponse({ status: 200, description: 'Favorites cleared successfully' })
  async clear(@Req() req: Request) {
    return this.favoritesService.clear((req.user as any).id);
  }
}
