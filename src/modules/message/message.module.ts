import { Module } from '@nestjs/common';
import { Message, MessageSchema } from './message.entity';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageService],
  controllers: [MessagesController],
  exports: [MessageService],
})
export class MessageModule {}
