import { Module } from '@nestjs/common';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService],
  controllers: [MessagesController],
  exports: [MessageService],
})
export class MessageModule {}
