import { Component } from '@angular/core';
import { CategoryForm } from '../category-form/category-form.component';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-category-create',
	templateUrl: './category-create.component.html',
	styleUrls: ['./category-create.component.css'],
})
export class CategoryCreateComponent {
	constructor(private store: Store) {}

	createCategory(categoryForm: CategoryForm): void {
		console.log(categoryForm);
		// this.store.dispatch()
	}
}
