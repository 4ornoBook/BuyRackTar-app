import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryActions } from '+state/category.store';
import { CategoryDto } from '+state/category.store';

@Component({
	selector: 'app-category-create',
	templateUrl: './category-create.component.html',
	styleUrls: ['./category-create.component.css'],
})
export class CategoryCreateComponent {
	constructor(private store: Store) {}

	createCategory(categoryForm: CategoryDto): void {
		console.log(categoryForm);

		this.store.dispatch(
			CategoryActions.createCategory({ categoryDto: categoryForm })
		);
	}
}
