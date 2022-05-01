export interface WalletTransactionEntity {
	id: number;
	fromWalletId: string;
	toWalletId: string;
	amount: number;
	time: number;
	description: string;
}
