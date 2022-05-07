export interface WalletTransactionEntity {
	id: number;
	fromWalletId: number;
	toWalletId: number;
	amount: number;
	time: number;
	description: string;
}
