import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import {
	ID_FROM_ROUTE,
	ID_FROM_ROUTE_PROVIDERS,
} from 'modules/shared/helpers/routing-helper';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TransactionTypes } from 'enums/transaction-type.enum';
import { WalletSelectors, WalletActions } from '+state/wallet.store';
import { CategorySelectors, CategoryActions } from '+state/category.store';

@UntilDestroy()
@Component({
	selector: 'app-wallet-view',
	templateUrl: './wallet-view.component.html',
	styleUrls: ['./wallet-view.component.css'],
	providers: [ID_FROM_ROUTE_PROVIDERS],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletViewComponent implements OnInit {
	public TransactionTypes = TransactionTypes;
	public buttonsDropdownOpen = false;

	public wallet$ = WalletSelectors.selectWallet(this.store, this.walletId$);

	public wallets$ = this.store.select(WalletSelectors.selectWallets);
	public categories$ = this.store.select(CategorySelectors.selectCategories);

	constructor(
		private store: Store,
		@Inject(ID_FROM_ROUTE) public walletId$: Observable<number>
	) {}

	ngOnInit(): void {
		this.walletId$.pipe(untilDestroyed(this)).subscribe(walletId => {
			this.store.dispatch(WalletActions.loadWallet({ walletId }));
			// this.store.dispatch(
			// 	WalletActions.({ categoryId })
			// );
		});

		this.store.dispatch(CategoryActions.loadCategories());
	}

	// public getWalletTotalSpendings(
	// 	transactions: WalletTransactionEntity CategoryTransactionsEntity[]
	// ) {
	// 	return transactions.reduce((sum, transaction) => {
	// 		return sum + transaction.amount;
	// 	}, 0);
	// }
}
