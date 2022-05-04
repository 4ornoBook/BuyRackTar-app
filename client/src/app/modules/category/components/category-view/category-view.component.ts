import { Component, Inject, OnInit } from '@angular/core';
import {
	ID_FROM_ROUTE,
	ID_FROM_ROUTE_PROVIDERS,
} from 'modules/shared/helpers/routing-helper';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
	CategoryInterface,
	CategorySelectors,
	CategoryActions,
} from '../../+state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-category-view',
	templateUrl: './category-view.component.html',
	styleUrls: ['./category-view.component.css'],
	providers: [ID_FROM_ROUTE_PROVIDERS],
})
export class CategoryViewComponent implements OnInit {
	public category$: Observable<CategoryInterface> =
		CategorySelectors.selectCategory(this.store, this.categoryId$);

	constructor(
		private store: Store,
		@Inject(ID_FROM_ROUTE) public categoryId$: Observable<number>
	) {}

	ngOnInit(): void {
		this.categoryId$
			.pipe(
				untilDestroyed(this),
				tap(categoryId =>
					this.store.dispatch(
						CategoryActions.loadCategory({ categoryId })
					)
				)
			)
			.subscribe();
	}
}
