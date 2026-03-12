import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable validation globally for our class-validator DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Configure microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // Listen on all interfaces
      port: parseInt(process.env.MICROSERVICE_PORT || '3002', 10),
    },
  });

  await app.startAllMicroservices();
  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port); // HTTP on configured port
}
bootstrap();
