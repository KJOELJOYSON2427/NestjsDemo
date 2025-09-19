import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin: '*',          // ✅ allow all origins (or specify sandbox URL)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,    // only if you use cookies/auth
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
