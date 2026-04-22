import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantQueryDto } from './dto/restaurant-query.dto';
import { AlongRouteDto } from './dto/along-route.dto';

@Injectable()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  findAll(query: RestaurantQueryDto) {
    return this.restaurantRepository.findAll(query);
  }

  findAlongRoute(dto: AlongRouteDto) {
    return this.restaurantRepository.findAlongRoute(dto);
  }

  async findOne(id: string) {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) throw new NotFoundException(`Restaurant ${id} introuvable`);
    return restaurant;
  }

  create(dto: CreateRestaurantDto) {
    return this.restaurantRepository.create(dto);
  }

  async update(id: string, dto: UpdateRestaurantDto) {
    await this.findOne(id);
    return this.restaurantRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.restaurantRepository.delete(id);
  }
}
