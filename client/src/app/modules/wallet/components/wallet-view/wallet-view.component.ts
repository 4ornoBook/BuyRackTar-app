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
import {
	TransactionActions,
	TransactionSelectors,
} from '+state/transaction.store';
import { SpendTargets } from 'enums/spend-targets.enum';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TransactionDto } from 'interfaces/transaction.dto';

@UntilDestroy()
@Component({
	selector: 'app-wallet-view',
	templateUrl: './wallet-view.component.html',
	styleUrls: ['./wallet-view.component.css'],
	providers: [ID_FROM_ROUTE_PROVIDERS],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletViewComponent implements OnInit {
	public SpendTargets = SpendTargets;
	public TransactionTypes = TransactionTypes;
	public buttonsDropdownOpen = false;

	public wallet$ = WalletSelectors.selectWallet(this.store, this.walletId$);
	public walletTransactions$ = this.store.select(
		TransactionSelectors.selectTransactions
	);

	public wallets$ = this.store.select(WalletSelectors.selectWallets);
	public categories$ = this.store.select(CategorySelectors.selectCategories);

	constructor(
		private store: Store,
		private dialogService: TuiDialogService,
		@Inject(ID_FROM_ROUTE) public walletId$: Observable<number>
	) {}

	public ngOnInit(): void {
		this.walletId$.pipe(untilDestroyed(this)).subscribe(walletId => {
			this.store.dispatch(WalletActions.loadWallet({ walletId }));
			this.store.dispatch(
				TransactionActions.loadWalletTransactions({ walletId })
			);
		});

		this.store.dispatch(WalletActions.loadWallets());
		this.store.dispatch(CategoryActions.loadCategories());
	}

	public makeTransaction(
		transactionDto: TransactionDto,
		dialogObserver: any
	) {
		dialogObserver.complete();
		console.log(transactionDto);
	}

	public showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
		this.dialogService.open(content).subscribe();
	}
}
