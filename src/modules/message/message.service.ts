import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  async findAll(userId: string, read?: boolean): Promise<Message[]> {
    return await this.messageRepo.find({ where: { userId, read } });
  }

  findMessageCount(userId: string, read?: boolean): Promise<number> {
    if (!read) return this.messageRepo.count({ where: { userId } });
    return this.messageRepo.count({ where: { userId, read } });
  }

  findOne(id: string): Promise<Message> {
    return this.messageRepo.findOne({ where: { id } });
  }

  async markAsRead(id: string) {
    return await this.messageRepo.update(id, { read: true });
  }

  async findAllMessages() {
    return await this.messageRepo.find();
  }
}
