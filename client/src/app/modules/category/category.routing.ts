import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryViewComponent } from './components/category-view/category-view.component';

export const routes: Routes = [
	{
		path: '',
		component: CategoriesTableComponent,
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
