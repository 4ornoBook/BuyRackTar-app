import { createFeature, createReducer, on } from '@ngrx/store';
import {
	addCategory,
	loadCategory,
	setCategories,
	setCategoriesLoading,
} from './category.actions';
import { CategoryEntity } from 'entities/Category.entity';

export interface CategoryState {
	categories: CategoryEntity[];
	loading: boolean;
	allCategoriesLoaded: boolean;
}

const initialState: CategoryState = {
	categories: [],
	loading: false,
	allCategoriesLoaded: false,
};

export const categoryFeatureKey = 'category';

export const categoryReducer = createReducer(
	initialState,
	on(setCategories, (state, { categories }) => ({
		...state,
		categories,
		loading: false,
		allCategoriesLoaded: true,
	})),
	on(addCategory, (state, { category }) => ({
		...state,
		loading: false,
		categories: [
			...state.categories.filter(cat => cat.id !== category.id),
			category,
		].sort((a, b) => a.id - b.id),
	})),
	on(setCategoriesLoading, (state, _) => ({ ...state, loading: true })),
	on(loadCategory, (state, _) => ({ ...state, loading: true }))
);

export const CategoryFeature = createFeature({
	name: categoryFeatureKey,
	reducer: categoryReducer,
});
