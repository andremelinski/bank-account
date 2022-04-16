import {
	IsNotEmpty,
	IsString,
	IsIn,
	IsPositive,
	IsNumber,
} from 'class-validator';
import { PixKeyKind } from 'src/models/pix-key.model';

export class PixKeyDto {
	@IsString()
	@IsNotEmpty()
	readonly key: string;

	@IsString()
	@IsIn(Object.values(PixKeyKind))
	@IsNotEmpty()
	readonly kind: PixKeyKind;

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	readonly balance: number;
}
