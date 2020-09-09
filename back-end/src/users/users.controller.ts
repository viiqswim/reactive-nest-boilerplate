import { Body, Controller, Delete, Get, Param, Post, Headers, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  User,
} from '../entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers('AuthToken') authToken): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Delete(':id/soft')
  softRemove(@Param('id') id: string): Promise<void> {
    return this.usersService.softRemove(id);
  }

  @Get('/restore/:id')
  softRemoveRestore(@Param('id') id: string): Promise<void> {
    return this.usersService.softRemoveRestore(id);
  }
}
