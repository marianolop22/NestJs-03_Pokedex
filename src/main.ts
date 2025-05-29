import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors();


  
  // app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // limpia el body de los datos que no necesito
      forbidNonWhitelisted: true, // si mandas campos demás, te tira error
      // esto de abajo es para transformar de forma automática los valores de los dtos
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  )
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
