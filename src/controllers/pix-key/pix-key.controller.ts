import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PixKeyDto } from 'src/dto/pix-key.dto';
import { BankAccount } from 'src/models/bank-account';
import { PixKey } from 'src/models/pix-key.model';
import { Repository } from 'typeorm';

@Controller('bank-accounts/:bankAccountId/pix-keys')
export class PixKeyController {
	constructor(
		@InjectRepository(PixKey)
		private pixKeyRepo: Repository<PixKey>,
		@InjectRepository(BankAccount)
		private bankAccountRepo: Repository<BankAccount>,
	) {}

	@Get()
	index(
		@Param('bankAccountId', new ParseUUIDPipe({ version: '4' }))
		bankAccountId: string,
	) {
		return this.pixKeyRepo.find({
			where: {
				bank_account_id: bankAccountId,
			},
			order: {
				created_at: 'DESC',
			},
		});
	}

	@Post()
	async store(
		@Param('bankAccountId', new ParseUUIDPipe({ version: '4' }))
		bankAccountId: string,
		@Body(new ValidationPipe({ errorHttpStatusCode: 422 })) // valida o corpo antes de seguir
		body: PixKeyDto,
	) {
		const { balance: actualBalance, owner_name } =
			await this.bankAccountRepo.findOneOrFail(bankAccountId);
		const { balance, ...pixInfo } = body;
		const value = {
			bank_account_id: bankAccountId,
			...pixInfo,
			owner_name,
		};
		let pixKey = this.pixKeyRepo.create(value);
		pixKey = await this.pixKeyRepo.save(pixKey);

		const newBalance = actualBalance + balance;
		const newUserInfo = await this.bankAccountRepo.update(bankAccountId, {
			balance: newBalance,
		});

		return { newUserInfo, pixKey };
	}
}
