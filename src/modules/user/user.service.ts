import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {}

  async create(username: string, email: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = this.userRepository.create({
      username,
      email,
    });

    const newUser = await this.userRepository.create(user);
    return await newUser.save();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
