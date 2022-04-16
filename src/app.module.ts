import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccountController } from './controllers/bank-account/bank-account.controller';
import { FixturesCommand } from './fixtures/fixtures.command';
import { BankAccount } from './models/bank-account';
import { PixKey } from './models/pix-key.model';
import { PixKeyController } from './controllers/pix-key/pix-key.controller';

@Module({
	imports: [
		ConfigModule.forRoot(),
		ConsoleModule,
		TypeOrmModule.forRoot({
			type: process.env.TYPEORM_CONNECTION as any,
			host: process.env.TYPEORM_HOST,
			port: parseInt(process.env.TYPEORM_PORT),
			username: process.env.TYPEORM_USERNAME,
			password: process.env.TYPEORM_PASSWORD,
			database: process.env.TYPEORM_DATABASE,
			entities: [BankAccount, PixKey],
		}),
		TypeOrmModule.forFeature([BankAccount, PixKey]), // habilita esse module dentro de outro modulo
	],
	controllers: [AppController, BankAccountController, PixKeyController],
	providers: [AppService, FixturesCommand],
})
export class AppModule {}
