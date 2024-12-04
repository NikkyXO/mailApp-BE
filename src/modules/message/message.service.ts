import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryMessage } from 'src/config/entities/entity.type';
import { MessageInput } from './dtos/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageRepo: Model<Message>,
  ) {}

  async findAll(data: QueryMessage): Promise<Message[]> {
    const { userId } = data;
    return await this.messageRepo.find({ userId });
  }

  async sendMessage(data: MessageInput) {
    const message = new this.messageRepo({
      ...data,
      username: data.senderName,
    });
    return await message.save();
  }

  findMessageCount(userId: string, read?: boolean): Promise<number> {
    return this.messageRepo.countDocuments({ userId, read });
  }
  async getAllUserMessagesCount(userId: string): Promise<number> {
    return await this.messageRepo.countDocuments({ userId });
  }

  findOne(id: string): Promise<Message> {
    return this.messageRepo.findOne({ _id: id });
  }

  async markAsRead(id: string) {
    return await this.messageRepo.updateOne(
      { _id: id },
      { read: true },
      {
        new: true,
      },
    );
  }

  async findAllMessages() {
    return await this.messageRepo.find();
  }

  async checkMessageExists(content: string, userId: string) {
    return await this.messageRepo.findOne({ content, userId });
  }

  async createMessage(data: MessageInput) {
    const message = new this.messageRepo(data);
    return await message.save();
  }
}
