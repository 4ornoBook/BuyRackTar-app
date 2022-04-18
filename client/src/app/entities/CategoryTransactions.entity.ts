export interface CategoryTransactionsEntity {
	id: string;
	walletId: string;
	categoryId: string;
	amount: number;
	time: number;
	description: string;
}
