export interface CategoryEntity {
	id: number;
	accountId: number;
	currencyId: number;
	name: string;
	limit: number;
	description: string;
	active: boolean;
}
