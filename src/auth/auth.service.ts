import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import type { User } from '@prisma/client';
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

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return { user };
  }

  async logout(response: Response): Promise<{ message: string }> {
    response.clearCookie('access_token');
    return { message: 'Déconnexion réussie' };
  }

  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findById(userId);
    const { password, ...result } = user;
    return result;
  }
}