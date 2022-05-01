export interface CategoryTransactionsEntity {
	id: number;
	walletId: string;
	categoryId: string;
	amount: number;
	time: number;
	description: string;
}
