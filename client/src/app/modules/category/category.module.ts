import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryRoutingModule } from './category.routing';
import {
	TuiDataListWrapperModule,
	TuiFieldErrorModule,
	TuiInputModule,
	TuiInputNumberModule,
	TuiIslandModule,
	TuiProgressModule,
	TuiSelectModule,
	TuiTextAreaModule,
} from '@taiga-ui/kit';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiGroupModule,
	TuiLabelModule,
	TuiLoaderModule,
} from '@taiga-ui/core';
import { StoreModule } from '@ngrx/store';
import { CategoryFeature, CategoryEffects } from './+state';
import { EffectsModule } from '@ngrx/effects';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
	declarations: [
		CategoryViewComponent,
		CategoryItemComponent,
		CategoriesTableComponent,
		CategoryFormComponent,
		CategoryCreateComponent,
	],
	imports: [
		CommonModule,
		StoreModule.forFeature(CategoryFeature),
		EffectsModule.forFeature([CategoryEffects]),
		CategoryRoutingModule,
		TuiIslandModule,
		TuiButtonModule,
		TuiProgressModule,
		TuiLabelModule,
		TuiCurrencyPipeModule,
		TuiLoaderModule,
		ReactiveFormsModule,
		TuiInputModule,
		TuiTextAreaModule,
		TuiInputNumberModule,
		TuiFieldErrorModule,
		TuiSelectModule,
		TuiDataListWrapperModule,
		TuiDataListModule,
		TuiLetModule,
		TuiGroupModule,
	],
})
export class CategoryModule {}
