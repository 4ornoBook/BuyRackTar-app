import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';

export const routes: Routes = [
	{
		path: '',
		component: CategoriesTableComponent,
	},
	{
		path: 'create',
		component: CategoryCreateComponent,
	},
	{
		path: 'edit/:id',
		component: CategoryEditComponent,
	},
	{
		path: ':id',
		component: CategoryViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CategoryRoutingModule {}
