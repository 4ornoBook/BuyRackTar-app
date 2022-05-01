import { createAction, props } from '@ngrx/store';
import { CategoryEntity } from 'entities/Category.entity';

const context = '[CATEGORY]';

export const loadCategories = createAction(
	`${context} load categories`,
	props<{ accountId: number }>()
);

export const setCategories = createAction(
	`${context} set categories`,
	props<{ categories: CategoryEntity[] }>()
);
