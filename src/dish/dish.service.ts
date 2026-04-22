import { Injectable, NotFoundException } from '@nestjs/common';
import { DishRepository } from './dish.repository';
import { DishQueryDto } from './dto/dish-query.dto';

@Injectable()
export class DishService {
  constructor(private readonly repository: DishRepository) {}

  findAll(query: DishQueryDto) {
    return this.repository.findAll(query);
  }

  async findOne(id: string) {
    const dish = await this.repository.findById(id);
    if (!dish) {
      throw new NotFoundException(`Plat ${id} introuvable`);
    }
    return dish;
  }
}

