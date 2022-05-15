import { createAction, props } from '@ngrx/store';
import { CategoryEntity } from 'entities/Category.entity';
import { CategoryDto } from './interfaces';

const context = '[CATEGORY]';

export const loadCategories = createAction(`${context} load categories`);

export const setCategoriesLoading = createAction(
	`${context} set categories loading`
);

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

export const createCategory = createAction(
	`${context} create category`,
	props<{ categoryDto: CategoryDto }>()
);

export const updateCategory = createAction(
	`${context} update category`,
	props<{ categoryId: number; categoryDto: CategoryDto }>()
);
