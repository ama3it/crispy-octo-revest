import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const appPort = configService.get<number>('APP_PORT', 3000);
  const microservicePort = configService.get<number>('MICROSERVICE_PORT', 3003);

  // Enable validation globally for our class-validator DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Connect TCP Microservice for inter-service communication
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: microservicePort,
    },
  });

  await app.startAllMicroservices();
  await app.listen(appPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Microservice is listening on port: ${microservicePort}`);
}
bootstrap();
