import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Un utilisateur avec cet email existe déjà');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async getPreferences(userId: string) {
    await this.findById(userId);
    return this.userRepository.getPreferences(userId);
  }

  async updatePreferences(userId: string, dto: UpdateUserPreferencesDto) {
    await this.findById(userId);
    return this.userRepository.updatePreferences(userId, {
      veganOnly: dto.veganOnly ?? false,
      excludedIngredients: (dto.excludedIngredients ?? []).map((item) => item.trim()).filter(Boolean),
      allergens: (dto.allergens ?? []).map((item) => item.trim()).filter(Boolean),
      excludedTags: (dto.excludedTags ?? []).map((item) => item.trim()).filter(Boolean),
    });
  }
}
