/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO, NewUserInput } from './dtos/auth.dto';
import { User } from '../user/user.entity';
import { MessageService } from '../message/message.service';
import { messages } from '../seeder/seedMessages';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private messageService: MessageService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ email: string; _id: string; username: string }> {
    const user = await this.userService.findOne(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDTO) {
    const userFound = await this.validateUser(user.email, user.password);
    if (!userFound) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: userFound['_doc']._id };
    await this.seedTestMessages(userFound['_doc']._id);

    return {
      accessToken: this.jwtService.sign(payload),
      user: userFound['_doc'],
    };
  }

  async register(data: NewUserInput) {
    const user = await this.userService.create(data);
    const { password: _, ...result } = user;
    return result;
  }

  async seedTestMessages(userId: string) {
    const testMessages = messages.map((message) => ({
      ...message,
      userId: userId,
      username: 'Adelaïde',
    }));

    for (const message of testMessages) {
      const exists = await this.messageService.checkMessageExists(
        message.content,
        userId,
      );
      if (!exists) {
        const newMessage = await this.messageService.createMessage(message);
        await newMessage.save();
      }
    }
  }
}
