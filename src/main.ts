import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MiddlewareMiddleware } from './middleware/middleware.middleware';
import { HttpExceptionFilter } from './common/httpExceptionFilter/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //全局中间件 需要是一个函数 不能是一个类
  app.use(MiddlewareMiddleware)
  //全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())
  //全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000);
}
bootstrap();
