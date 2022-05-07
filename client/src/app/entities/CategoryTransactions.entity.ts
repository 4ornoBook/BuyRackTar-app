export interface CategoryTransactionsEntity {
	id: number;
	walletId: number;
	categoryId: number;
	amount: number;
	time: number;
	description: string;
}
