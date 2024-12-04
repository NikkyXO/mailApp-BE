import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from './user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewUserInput } from '../auth/dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {}

  async create(data: NewUserInput): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      email: data.email,
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log({ hashedPassword });

    const user = await this.userRepository.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return await user.save();
  }

  async findOne(email: string): Promise<UserDocument> {
    const user = await this.userRepository.findOne({ email });
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
    // TODO: exclude password
    return await this.userRepository.find();
  }
}
