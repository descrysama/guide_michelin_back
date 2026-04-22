import { Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UpdateUserPreferencesDto } from '../user/dto/update-user-preferences.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../user/user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginUserDto })
  async login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(req.user, response);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req: Request) {
    return this.authService.getProfile((req.user as any).id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preferences')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user food preferences' })
  @ApiResponse({ status: 200, description: 'User preferences retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPreferences(@Req() req: Request) {
    return this.userService.getPreferences((req.user as any).id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('preferences')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Save user food preferences' })
  @ApiResponse({ status: 200, description: 'User preferences saved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: UpdateUserPreferencesDto })
  async updatePreferences(@Req() req: Request, @Body(ValidationPipe) dto: UpdateUserPreferencesDto) {
    return this.userService.updatePreferences((req.user as any).id, dto);
  }
}
