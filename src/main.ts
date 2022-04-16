import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModelNotFoundExceptionFilter } from './controllers/exception-filter/model-not-found.exeception';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.setGlobalPrefix('api');
	app.useGlobalFilters(new ModelNotFoundExceptionFilter());
	await app.listen(3000);
}
bootstrap();
