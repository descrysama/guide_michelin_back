import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import type { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ user: Omit<User, 'password'> }> {
    const user = await this.userService.create(createUserDto);
    const { password, ...result } = user;
    return { user: result };
  }

  async login(user: any, response: Response): Promise<{ user: any }> {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    const isProd = process.env.NODE_ENV === 'production';
    response.cookie('access_token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { user };
  }

  async logout(response: Response): Promise<{ message: string }> {
    const isProd = process.env.NODE_ENV === 'production';
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    });
    return { message: 'Déconnexion réussie' };
  }

  async getProfile(userId: string): Promise<any> {
    const user = await this.userService.findById(userId);
    const preferences = await this.userService.getPreferences(userId);
    const { password, ...result } = user;
    return {
      ...result,
      preferences,
    };
  }
}
