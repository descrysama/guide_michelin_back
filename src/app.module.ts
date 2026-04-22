import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
<<<<<<< HEAD
  imports: [PrismaModule, AuthModule, UserModule, FavoritesModule],
=======
  imports: [PrismaModule, AuthModule, UserModule, RestaurantModule],
>>>>>>> 72349979ab453f8b17226ca0ac476e5208418ea2
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
