import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Body,
  Request,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { MessageInput } from './dtos/message.dto';

@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessageService) {}

  @Get('/user')
  @ApiOperation({ summary: 'Get all user messages' })
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.messagesService.findAll({ userId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all platform messages' })
  findAllMessages() {
    return this.messagesService.findAllMessages();
  }

  @Get('/stats')
  @ApiOperation({ summary: 'Get messages statistics count' })
  async findMessageCount(@Request() req) {
    const userId = req.user.id;
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

  @Get('mark-read/:id')
  @ApiOperation({ summary: 'Mark message as read' })
  markAsRead(@Param('id') id: string) {
    return this.messagesService.markAsRead(id);
  }

  @Get('mark-unread/:id')
  @ApiOperation({ summary: 'Mark message as unread' })
  markAsUnRead(@Param('id') id: string) {
    return this.messagesService.markAsUnRead(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Compose a new message' })
  createMessage(@Request() req, @Body() data: MessageInput) {
    const userId = req.user.id;
    data.userId = userId;
    return this.messagesService.createMessage(data);
  }
}
