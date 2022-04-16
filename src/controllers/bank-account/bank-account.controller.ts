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
import { BankAccountDto } from 'src/dto/bank-account.dto';
import { BankAccount } from 'src/models/bank-account';
import { Repository } from 'typeorm';

@Controller('bank-accounts')
export class BankAccountController {
	constructor(
		@InjectRepository(BankAccount)
		private bankAccountRepo: Repository<BankAccount>,
	) {}

	@Post()
	async createBankAccount(
		@Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
		body: BankAccountDto,
	) {
		const userExist = this.bankAccountRepo.findOne({
			where: {
				bank_account_id: body.account_number,
			},
		});
		if (userExist) {
			return { statusCode: 400, message: 'User already exists' };
		}
		const bankAccount = this.bankAccountRepo.create(body);
		return await this.bankAccountRepo.save(bankAccount);
	}

	@Get()
	index() {
		return this.bankAccountRepo.find();
	}

	@Get(':bankAccountId')
	show(
		@Param('bankAccountId', new ParseUUIDPipe({ version: '4' }))
		bankAccountId: string,
	) {
		return this.bankAccountRepo.findOneOrFail(bankAccountId);
	}
}
