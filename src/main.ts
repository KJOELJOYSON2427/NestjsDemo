import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './common/common.interceptor';
import { LoggerMiddleware } from './common/logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

//   app.useGlobalPipes(
//   new ValidationPipe(),
// );

  app.useGlobalInterceptors(
    new LoggerInterceptor()
  )

  
  await app.listen(process.env.PORT ?? 3000,()=>{
    console.log("started");
  });
}
bootstrap();
