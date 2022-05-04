import { createAction, props } from '@ngrx/store';
import { CategoryEntity } from 'entities/Category.entity';

const context = '[CATEGORY]';

export const loadCategories = createAction(`${context} load categories`);

export const setCategories = createAction(
	`${context} set categories`,
	props<{ categories: CategoryEntity[] }>()
);

export const addCategory = createAction(
	`${context} add category`,
	props<{ category: CategoryEntity }>()
);

export const loadCategory = createAction(
	`${context} load category`,
	props<{ categoryId: number }>()
);
