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
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryActions, CategorySelectors } from '+state/category.store';
import {
	TransactionActions,
	TransactionSelectors,
} from '+state/transaction.store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TransactionTypes } from 'enums/transaction-type.enum';
import { CombinedTransaction } from '+state/transaction.store/interfaces/combined-transaction.interface';
import { WalletActions, WalletSelectors } from '+state/wallet.store';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { SpendTargets } from 'enums/spend-targets.enum';
import { TransactionDto } from '../../../../interfaces/transaction.dto';

@UntilDestroy()
@Component({
	selector: 'app-category-view',
	templateUrl: './category-view.component.html',
	styleUrls: ['./category-view.component.css'],
	providers: [ID_FROM_ROUTE_PROVIDERS],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryViewComponent implements OnInit {
	public SpendTargets = SpendTargets;
	public TransactionTypes = TransactionTypes;

	public category$ = CategorySelectors.selectCategory(
		this.store,
		this.categoryId$
	);
	public categoryTransactions$ = this.store.select(
		TransactionSelectors.selectTransactions
	);

	public wallets$ = this.store.select(WalletSelectors.selectWallets);

	public buttonsDropdownOpen = false;

	constructor(
		private store: Store,
		private dialogService: TuiDialogService,
		@Inject(ID_FROM_ROUTE) public categoryId$: Observable<number>
	) {}

	ngOnInit(): void {
		this.categoryId$.pipe(untilDestroyed(this)).subscribe(categoryId => {
			this.store.dispatch(CategoryActions.loadCategory({ categoryId }));
			this.store.dispatch(
				TransactionActions.loadCategoryTransactions({ categoryId })
			);
		});

		this.store.dispatch(WalletActions.loadWallets());
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

	public getCategoryTotalSpendings(transactions: CombinedTransaction[]) {
		return transactions.reduce((sum, transaction) => {
			return sum + (transaction?.amount || 0);
		}, 0);
	}
}
