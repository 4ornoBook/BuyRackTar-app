import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryActions, CategoryFeature } from '../../+state';
import { UserFeature } from 'modules/shared/+state/user.store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-categories-table',
	templateUrl: './categories-table.component.html',
	styleUrls: ['./categories-table.component.css'],
})
export class CategoriesTableComponent implements OnInit {
	@Input() accountId: number | null = null;

	private account$ = this.store.select(UserFeature.selectAccount);
	public categories$ = this.store.select(CategoryFeature.selectCategories);

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
