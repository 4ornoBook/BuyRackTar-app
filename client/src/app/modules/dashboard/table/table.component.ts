import { Component, OnInit } from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { CombinedTransaction } from '+state/transaction.store/interfaces/combined-transaction.interface';
import {
	TransactionActions,
	TransactionSelectors,
} from '+state/transaction.store';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TuiDialogService } from '@taiga-ui/core';
import { TransactionTypes } from 'enums/transaction-type.enum';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
	public TransactionTypes = TransactionTypes;

	public transactions$ = this.store.select(
		TransactionSelectors.selectTransactions
	);

	public transactionType = new FormControl(TransactionTypes.Wallet);

	constructor(
		private store: Store,
		private dialogService: TuiDialogService
	) {}

	public ngOnInit(): void {
		this.store.dispatch(TransactionActions.loadUserTransactions());
	}

	@tuiPure
	public filterTransactions(
		transactions: CombinedTransaction[],
		transactionType: TransactionTypes
	) {
		if (transactionType === TransactionTypes.Category) {
			return transactions.filter(transaction => transaction.category);
		}

		return transactions.filter(transaction => transaction.toWallet);
	}
}
