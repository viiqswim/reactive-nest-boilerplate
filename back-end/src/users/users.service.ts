import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  User,
  Profile,
} from '../entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const profile = new Profile();
    profile.gender = "male";
    profile.photo = "me.jpg";
    await this.profilesRepository.save(profile);

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.profile = profile;
    const savedUser = this.usersRepository.save(user);

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async softRemove(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async softRemoveRestore(id: string): Promise<void> {
    await this.usersRepository.restore(id);
  }
}
