import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryActions, CategorySelectors } from '../../+state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserSelectors } from 'modules/shared/+state/user.store';

@UntilDestroy()
@Component({
	selector: 'app-categories-table',
	templateUrl: './categories-table.component.html',
	styleUrls: ['./categories-table.component.css'],
})
export class CategoriesTableComponent implements OnInit {
	private account$ = this.store.select(UserSelectors.selectAccount);
	public categories$ = this.store.select(CategorySelectors.selectCategories);

	constructor(private readonly store: Store) {}

	ngOnInit(): void {
		this.account$.pipe(untilDestroyed(this)).subscribe(account => {
			if (!account) {
				return;
			}

			this.store.dispatch(
				CategoryActions.loadCategories({ accountId: account.id })
			);
		});
	}
}
