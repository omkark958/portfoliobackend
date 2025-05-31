import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   app.enableCors({
//   origin: ['http://localhost:4200', 'https://your-flutter-web-app.web.app'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// });
app.enableCors({
  origin: true, // reflects request origin
  credentials: true,
});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
