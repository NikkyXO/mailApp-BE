import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BaseEntity } from 'src/config/entities/entity.type';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: undefined,
  toJSON: {
    getters: true,
    aliases: true,
    virtuals: true,
  },
})
export class User extends BaseEntity {
  @Prop({
    index: true,
    unique: true,
  })
  @ApiProperty()
  username: string;

  @Prop({
    index: true,
    unique: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
