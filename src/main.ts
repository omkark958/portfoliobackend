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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: (
      origin: unknown,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (typeof origin === 'string' && origin.startsWith('http://localhost')) {
        callback(null, true);
      } else if (
        typeof origin === 'string' &&
        origin.startsWith('https://omkarpkulkarni.netlify.app')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
(async () => {
  await bootstrap();
})().catch((err) => {
  console.error('Bootstrap failed:', err);
});
