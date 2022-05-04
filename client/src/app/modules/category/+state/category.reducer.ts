import { createFeature, createReducer, on } from '@ngrx/store';
import {
	addCategory,
	loadCategories,
	loadCategory,
	setCategories,
} from './category.actions';
import { CategoryEntity } from 'entities/Category.entity';

export interface CategoryState {
	categories: CategoryEntity[];
	loading: boolean;
}

const initialState: CategoryState = {
	categories: [
		{
			id: 1,
			accountId: 1,
			name: 'Games',
			active: true,
			currencyId: 1,
			description: 'A category for my leisure time, i like playing games',
			limit: 130,
		},
		{
			id: 2,
			accountId: 1,
			name: 'Grocery',
			active: false,
			currencyId: 2,
			description: 'A category for some food from grocery stores',
			limit: 400,
		},
		{
			id: 3,
			accountId: 1,
			name: 'Games',
			active: true,
			currencyId: 1,
			description: 'A category for my leisure time, i like playing games',
			limit: 220,
		},
		{
			id: 4,
			accountId: 1,
			name: 'Grocery',
			active: false,
			currencyId: 1,
			description: 'A category for some food from grocery stores',
			limit: 400,
		},
		{
			id: 5,
			accountId: 1,
			name: 'Games',
			active: true,
			currencyId: 1,
			description: 'A category for my leisure time, i like playing games',
			limit: 220,
		},
		{
			id: 6,
			accountId: 1,
			name: 'Grocery',
			active: false,
			currencyId: 1,
			description: 'A category for some food from grocery stores',
			limit: 400,
		},
	],
	loading: false,
};

export const categoryFeatureKey = 'category';

export const categoryReducer = createReducer(
	initialState,
	on(setCategories, (state, { categories }) => ({
		categories,
		loading: false,
	})),
	on(addCategory, (state, { category }) => ({
		loading: false,
		categories: [
			...state.categories.filter(cat => cat.id !== category.id),
			category,
		],
	})),
	on(loadCategories, (state, _) => ({ ...state, loading: true })),
	on(loadCategory, (state, _) => ({ ...state, loading: true }))
);

export const CategoryFeature = createFeature({
	name: categoryFeatureKey,
	reducer: categoryReducer,
});
