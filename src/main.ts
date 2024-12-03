import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Message Service')
    .setDescription('Message Service')
    .setVersion('1.0')
    .setContact('Nikky', 'nikky.co', 'developer@nikky.co')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap().then(() => {
  const logger = new Logger('Bootstrap');
  logger.log('Wallet service started ');
});
