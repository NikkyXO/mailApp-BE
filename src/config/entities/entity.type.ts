import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { v4 } from 'uuid';

export class BaseEntity {
  @Prop({
    required: true,
    type: Schema.Types.Mixed,
    default: () => v4(),
    alias: 'id',
  })
  _id: string;

  @Prop({
    required: false,
    type: Schema.Types.Date,
    default: null,
  })
  deletedAt: Date;
}

export interface QueryMessage {
  userId: string;
  read?: boolean;
  all?: boolean;
}

export class UpdateMessage {
  read?: boolean;

  @ApiProperty({
    required: true,
    type: String,
  })
  id: string;
}
