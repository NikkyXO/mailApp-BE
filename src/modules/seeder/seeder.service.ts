import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class SeederService {
  userTest: any;
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
    @InjectModel(Message.name)
    private readonly messageRepository: Model<Message>,
    private readonly userService: UserService,
  ) {}

  async seedUsers() {
    console.log('seeding users');
    const user = {
      username: 'John Doe',
      email: 'john@example.com',
      password: 'test123',
    };

    const exists = await this.userRepository.findOne({ email: user.email });
    if (!exists) {
      const newUser = await this.userService.create(user);
      this.userTest = newUser;
    }
    this.userTest = exists;
  }

  async seedMessages() {
    console.log('seeding messages');
    if (this.userTest) {
      const messages = [
        {
          subject: 'Welcome',
          content:
            'Welcome to the inbox application!  You can start checking your messages.',
          read: false,
          username: this.userTest.username,
          userId: this.userTest.id,
        },
        {
          subject: 'Reminder',
          content:
            'Don’t forget to check your messages. This is a reminder message.',
          read: true,
          username: this.userTest.username,
          userId: this.userTest.id,
        },
        {
          subject: 'Question',
          content: 'Can I get some help with this? I have a question. Thanks.',
          read: false,
          username: this.userTest.username,
          userId: this.userTest.id,
        },
        {
          subject: 'Update',
          content:
            'We have updated our privacy policy. Please check it out. Thanks.',
          read: false,
          username: this.userTest.username,
          userId: this.userTest.id,
        },
        {
          subject: 'Important',
          content: 'This is an important message.',
          read: false,
          username: this.userTest.username,
          userId: this.userTest.id,
        },
      ];

      for (const message of messages) {
        const exists = await this.messageRepository.findOne({
          content: message.content,
          userId: this.userTest.id,
        });
        if (!exists) {
          const newMessage = await this.messageRepository.create(message);
          await newMessage.save();
        }
      }
    }
  }
}
