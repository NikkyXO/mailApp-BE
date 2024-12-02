import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

@Injectable()
export class SeederService {
  userTest: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async seedUsers() {
    console.log('seeding users');
    const users = [{ username: 'John Doe', email: 'john@example.com' }];

    for (const user of users) {
      const exists = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (!exists) {
        const newUser = await this.userRepository.save(user);
        this.userTest = newUser;
        console.log({ user: this.userTest });
      }
    }
  }

  async seedMessages() {
    console.log('seeding messages');
    if (this.userTest) {
      const messages = [
        {
          subject: 'Welcome',
          content: 'Welcome to the inbox application!',
          read: false,
          username: this.userTest.username,
          userId: this.userTest.id,
        },
        {
          subject: 'Reminder',
          content: 'Don’t forget to check your messages.',
          read: true,
          username: this.userTest.username,
          userId: this.userTest.id,
        },
        {
          subject: 'Question',
          content: 'Can I get some help with this?',
          read: false,
          username: this.userTest.username,
          userId: this.userTest.id,
        },
        {
          subject: 'Update',
          content: 'We have updated our privacy policy.',
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
          where: { subject: message.subject, userId: this.userTest.id },
        });
        if (!exists) {
          await this.messageRepository.save(message);
        }
      }
    }
  }
}
