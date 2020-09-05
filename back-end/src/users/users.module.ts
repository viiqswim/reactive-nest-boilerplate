import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import {
  User,
  Profile,
} from '../entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
