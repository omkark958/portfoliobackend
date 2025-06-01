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
    const allowedOrigins = [
      'http://localhost',
      'https://omkarpkulkarni.netlify.app',
      'https://portfoliobackend-o3w8.onrender.com',
    ];

    // ✅ Allow requests with no origin (e.g., server checks, curl, Postman)
    if (
      !origin || 
      (typeof origin === 'string' &&
        allowedOrigins.some((o) => origin.startsWith(o)))
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
