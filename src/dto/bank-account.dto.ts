import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class BankAccountDto {
	@IsNumber()
	@IsNotEmpty()
	account_number: string;

	@IsNotEmpty()
	@IsString()
	owner_name: string;

	@IsPositive()
	balance: number;
}
