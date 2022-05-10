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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoryTransactionsEntity } from 'entities/CategoryTransactions.entity';
import { TransactionTypes } from 'enums/transaction-type.enum';

@UntilDestroy()
@Component({
	selector: 'app-category-view',
	templateUrl: './category-view.component.html',
	styleUrls: ['./category-view.component.css'],
	providers: [ID_FROM_ROUTE_PROVIDERS],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryViewComponent implements OnInit {
	public TransactionTypes = TransactionTypes;

	public category$ = CategorySelectors.selectCategory(
		this.store,
		this.categoryId$
	);

	public buttonsDropdownOpen = false;

	constructor(
		private store: Store,
		@Inject(ID_FROM_ROUTE) public categoryId$: Observable<number>
	) {}

	ngOnInit(): void {
		this.categoryId$.pipe(untilDestroyed(this)).subscribe(categoryId => {
			this.store.dispatch(CategoryActions.loadCategory({ categoryId }));
			this.store.dispatch(
				CategoryActions.loadCategoryTransactions({ categoryId })
			);
		});
	}

	public getCategoryTotalSpendings(
		transactions: CategoryTransactionsEntity[]
	) {
		return transactions.reduce((sum, transaction) => {
			return sum + transaction.amount;
		}, 0);
	}
}
