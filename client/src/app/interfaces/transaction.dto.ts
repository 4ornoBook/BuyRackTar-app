import { SpendTargets } from '../enums/spend-targets.enum';

export interface TransactionDto {
	source: number;
	destination: number;
	spendTarget: SpendTargets;
	amount: number;
}
