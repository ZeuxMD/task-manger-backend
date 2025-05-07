import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ScrapingService } from './scraping.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, ScrapingService],
  controllers: [UsersController],
  exports: [UsersService, ScrapingService], // Export UsersService so other modules (like Auth) can use it
})
export class UsersModule {}
