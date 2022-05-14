import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryActions, CategorySelectors } from '+state/category.store';
import { UserSelectors } from '+state/user.store';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-categories-table',
	templateUrl: './categories-table.component.html',
	styleUrls: ['./categories-table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesTableComponent implements OnInit {
	private account$ = this.store.select(UserSelectors.selectAccount);

	public categories$ = this.store.select(CategorySelectors.selectCategories);
	public categoriesLoading$ = this.store.select(
		CategorySelectors.selectLoading
	);

	constructor(private readonly store: Store) {}

	ngOnInit(): void {
		this.account$.subscribe(account => {
			if (account) {
				this.store.dispatch(CategoryActions.loadCategories());
			}
		});
	}
}
