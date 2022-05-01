import { createFeature, createReducer, on } from '@ngrx/store';
import { setCategories } from './category.actions';
import { CategoryEntity } from 'entities/Category.entity';

export interface CategoryState {
	categories: CategoryEntity[];
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
			limit: 400,
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
};

export const categoryFeatureKey = 'category';

export const categoryReducer = createReducer(
	initialState,
	on(setCategories, (_, { categories }) => ({ categories }))
);

export const CategoryFeature = createFeature({
	name: categoryFeatureKey,
	reducer: categoryReducer,
});
