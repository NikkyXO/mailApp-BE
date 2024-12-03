import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessageService) {}

  @Get('/user')
  @ApiOperation({ summary: 'Get all user messages' })
  findAll(@Query('userId') userId: string) {
    return this.messagesService.findAll({ userId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all platform messages' })
  findAllMessages() {
    return this.messagesService.findAllMessages();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get messages statistics count' })
  async findMessageCount(@Query('userId') userId: string) {
    const total = await this.messagesService.getAllUserMessagesCount(userId);
    const unread = await this.messagesService.findMessageCount(userId, false);
    const readCount = await this.messagesService.findMessageCount(userId, true);
    return { total: total, unread, readCount };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get message by id' })
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mark message as read' })
  markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(id);
  }
}
