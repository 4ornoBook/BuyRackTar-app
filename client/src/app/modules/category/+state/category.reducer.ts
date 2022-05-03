import { createFeature, createReducer, on } from '@ngrx/store';
import { loadCategories, setCategories } from './category.actions';
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
			limit: 220,
		},
		{
			id: 2,
			accountId: 1,
			name: 'Grocery',
			active: false,
			currencyId: 1,
			description: 'A category for some food from grocery stores',
			limit: 400,
		},
		{
			id: 1,
			accountId: 1,
			name: 'Games',
			active: true,
			currencyId: 1,
			description: 'A category for my leisure time, i like playing games',
			limit: 220,
		},
		{
			id: 2,
			accountId: 1,
			name: 'Grocery',
			active: false,
			currencyId: 1,
			description: 'A category for some food from grocery stores',
			limit: 400,
		},
		{
			id: 1,
			accountId: 1,
			name: 'Games',
			active: true,
			currencyId: 1,
			description: 'A category for my leisure time, i like playing games',
			limit: 220,
		},
		{
			id: 2,
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
	on(loadCategories, (state, _) => ({ ...state, loading: true }))
);

export const CategoryFeature = createFeature({
	name: categoryFeatureKey,
	reducer: categoryReducer,
});
