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
import { catchError, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TransactionTypes } from 'enums/transaction-type.enum';
import { WalletActions, WalletSelectors } from '+state/wallet.store';
import { CategoryActions, CategorySelectors } from '+state/category.store';
import { TransactionService } from 'modules/shared/api/services/transaction.service';
import { CombinedTransaction } from '+state/transaction.store/interfaces/combined-transaction.interface';
import {
	TransactionActions,
	TransactionSelectors,
} from '+state/transaction.store';
import { SpendTargets } from 'enums/spend-targets.enum';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TransactionDto } from 'interfaces/transaction.dto';
import { FormControl } from '@angular/forms';
import { tuiPure } from '@taiga-ui/cdk';
import { map } from 'rxjs/operators';
import { addTransaction } from '../../../../+state/transaction.store/transaction.actions';
import { NotificationAlertService } from '../../../shared/helpers/notification-alert.service';
import { loadWallets } from '../../../../+state/wallet.store/wallet.actions';

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
	public transactions$ = this.store.select(
		TransactionSelectors.selectTransactions
	);

	public wallets$ = this.store.select(WalletSelectors.selectWallets);
	public categories$ = this.store.select(CategorySelectors.selectCategories);

	public transactionType = new FormControl(TransactionTypes.Wallet);

	constructor(
		private store: Store,
		private dialogService: TuiDialogService,
		private transactionService: TransactionService,
		private notificationService: NotificationAlertService,
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
		this.transactionService
			.makeTransaction(transactionDto)
			.pipe(
				map(transaction => {
					this.store.dispatch(addTransaction({ transaction }));
					dialogObserver.complete();
					this.notificationService.showSuccess(
						'Yeeep!',
						'A new transactions is already in your history'
					);
				}),
				catchError(err => {
					this.notificationService.showError(
						`Whoops! Something went wrong ${err?.error?.error}`
					);
					throw err;
				})
			)
			.subscribe();
	}

	public replenishWallet(
		transactionDto: TransactionDto,
		dialogObserver: any
	) {
		this.transactionService
			.replenishWallet(transactionDto)
			.pipe(
				map(transaction => {
					this.store.dispatch(addTransaction({ transaction }));
					dialogObserver.complete();
					this.notificationService.showSuccess(
						'Yeeep!',
						'A new transactions is already in your history'
					);
				}),
				catchError(err => {
					this.notificationService.showError(
						`Whoops! Something went wrong ${err?.error?.error}`
					);
					throw err;
				})
			)
			.subscribe();
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

	public showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
		this.dialogService.open(content).subscribe();
	}
}
