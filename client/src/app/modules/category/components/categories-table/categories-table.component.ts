import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryActions, CategorySelectors } from '../../+state';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-categories-table',
	templateUrl: './categories-table.component.html',
	styleUrls: ['./categories-table.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesTableComponent implements OnInit {
	public categories$ = this.store.select(CategorySelectors.selectCategories);
	public categoriesLoading$ = this.store.select(
		CategorySelectors.selectLoading
	);

	constructor(private readonly store: Store) {}

	ngOnInit(): void {
		this.store.dispatch(CategoryActions.loadCategories());
	}
}
