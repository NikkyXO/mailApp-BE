import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './modules/seeder/seeder.service';
import { SeederModule } from './modules/seeder/seeder.module';
import { configuration } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongoDBURI'),
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    MessageModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}
  async onModuleInit() {
    await this.seederService.seedUsers();
    await this.seederService.seedMessages();
  }
}
