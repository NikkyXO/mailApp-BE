import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';
import { SeederService } from './seeder.service';
import { Message, MessageSchema } from '../message/message.entity';
import { User, UserSchema } from '../user/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MessageModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
