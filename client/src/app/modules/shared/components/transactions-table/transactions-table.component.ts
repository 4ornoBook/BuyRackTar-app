import { Component, Input } from '@angular/core';
import { CategoryTransactionsEntity } from 'entities/CategoryTransactions.entity';
import { WalletTransactionEntity } from 'entities/WalletTransaction.entity';
import { TransactionTypes } from 'enums/transaction-type.enum';

type CombinedTransactions = Partial<
	CategoryTransactionsEntity & WalletTransactionEntity
>[];

@Component({
	selector: 'app-transactions-table',
	templateUrl: './transactions-table.component.html',
	styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
	@Input() transactions: CombinedTransactions = [];

	public TransactionTypes = TransactionTypes;
	@Input() transactionType: TransactionTypes = TransactionTypes.Category;

	constructor() {}
}
