import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/config/entities/entity.type';

export type UserDocument = Message & Document;

@Schema({
  timestamps: true,
  versionKey: undefined,
  toJSON: {
    getters: true,
    aliases: true,
    virtuals: true,
  },
})
export class Message extends BaseEntity {
  @Prop({
    index: true,
    unique: false,
  })
  @ApiProperty()
  username: string;

  @Prop({
    required: true,
  })
  subject: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    default: false,
  })
  read: boolean;

  @Prop({
    required: true,
  })
  userId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
