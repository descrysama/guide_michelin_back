import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { DishRepository } from './dish.repository';

@Module({
  controllers: [DishController],
  providers: [DishService, DishRepository],
  exports: [DishService],
})
export class DishModule {}

