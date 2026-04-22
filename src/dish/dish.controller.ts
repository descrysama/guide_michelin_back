import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DishService } from './dish.service';
import { DishQueryDto } from './dto/dish-query.dto';

@ApiTags('dishes')
@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les plats (avec filtres)' })
  findAll(@Query() query: DishQueryDto) {
    return this.dishService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un plat par id' })
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(id);
  }
}

