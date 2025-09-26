import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
// import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global exception filters
  // !Temporarily disabled
  // app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
