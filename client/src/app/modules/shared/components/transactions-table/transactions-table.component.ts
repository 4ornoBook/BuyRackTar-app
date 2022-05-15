import { Component, Input } from '@angular/core';
import { TransactionTypes } from 'enums/transaction-type.enum';
import { CombinedTransaction } from '+state/transaction.store/interfaces/combined-transaction.interface';

@Component({
	selector: 'app-transactions-table',
	templateUrl: './transactions-table.component.html',
	styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent {
	@Input() transactions: CombinedTransaction[] = [];

	public TransactionTypes = TransactionTypes;
	@Input() transactionType: TransactionTypes = TransactionTypes.Category;

	constructor() {}
}
