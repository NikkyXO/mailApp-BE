import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class MessageInput {
  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty({
    example:
      'Welcome to the inbox application!  You can start checking your messages.',
  })
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  senderName?: string;
}

export class CreateTestMessage {
  @ApiProperty()
  @IsString()
  @IsOptional()
  userId?: string;
}
