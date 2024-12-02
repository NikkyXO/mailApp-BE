import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    UserModule,
    MessageModule,
    TypeOrmModule.forFeature([Message, User]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
