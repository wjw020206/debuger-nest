import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidatePipeCustom } from './pipe/validate-pipe-custom';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useStaticAssets('public', { prefix: '/public' });
  // 使用全局管道进行验证
  app.useGlobalPipes(new ValidatePipeCustom());
  await app.listen(3000);
}
bootstrap();
