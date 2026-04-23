import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExperienceService } from './experience.service';
import { ExperienceQueryDto } from './dto/experience-query.dto';
import { AlongRouteExperienceDto } from './dto/along-route-experience.dto';

@ApiTags('Experiences')
@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  @ApiOperation({ summary: 'List experiences' })
  @ApiResponse({ status: 200, description: 'Experiences returned successfully' })
  findAll(@Query(new ValidationPipe({ transform: true })) query: ExperienceQueryDto) {
    return this.experienceService.findAll(query);
  }

  @Get('highlights')
  @ApiOperation({ summary: 'Get featured experiences for homepage sections' })
  highlights(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.experienceService.highlights(limit ?? 8);
  }

  @Post('along-route')
  @ApiOperation({ summary: 'List experiences near an itinerary polyline' })
  alongRoute(@Body(new ValidationPipe({ transform: true })) dto: AlongRouteExperienceDto) {
    return this.experienceService.findAlongRoute(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one experience by id' })
  findOne(@Param('id') id: string) {
    return this.experienceService.findById(id);
  }
}

