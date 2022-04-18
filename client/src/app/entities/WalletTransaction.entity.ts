export interface WalletTransactionEntity {
	id: string;
	fromWalletId: string;
	toWalletId: string;
	amount: number;
	time: number;
	description: string;
}
