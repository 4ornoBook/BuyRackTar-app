import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryActions, CategorySelectors } from '+state/category.store';
import {
	ID_FROM_ROUTE,
	ID_FROM_ROUTE_PROVIDERS,
} from 'modules/shared/helpers/routing-helper';
import { filter, Observable } from 'rxjs';
import { CategoryEditDto } from '+state/category.store/interfaces/category-edit.dto';
import { FormActs } from 'enums/form-acts.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-category-edit',
	templateUrl: './category-edit.component.html',
	styleUrls: ['./category-edit.component.css'],
	providers: [ID_FROM_ROUTE_PROVIDERS],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryEditComponent implements OnInit {
	public category$ = CategorySelectors.selectSimpleCategory(
		this.store,
		this.categoryId$
	);

	public FormActs = FormActs;

	constructor(
		private store: Store,
		@Inject(ID_FROM_ROUTE) public categoryId$: Observable<number>
	) {}

	ngOnInit() {
		this.categoryId$
			.pipe(
				untilDestroyed(this),
				filter(categoryId => !!categoryId)
			)
			.subscribe(categoryId => {
				this.store.dispatch(
					CategoryActions.loadCategory({ categoryId })
				);
			});
	}

	updateCategory(categoryEdit: CategoryEditDto): void {
		const { id, ...categoryDto } = categoryEdit;

		this.store.dispatch(
			CategoryActions.updateCategory({
				categoryId: id as number,
				categoryDto,
			})
		);
	}
}
