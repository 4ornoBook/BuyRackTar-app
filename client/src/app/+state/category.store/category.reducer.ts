import { createFeature, createReducer, on } from '@ngrx/store';
import {
	addCategory,
	addCategoryTransactions,
	loadCategory,
	setCategories,
	setCategoriesLoading,
} from './category.actions';
import { CategoryEntity } from 'entities/Category.entity';
import { CategoryTransactionsEntity } from 'entities/CategoryTransactions.entity';

export interface CategoryState {
	categories: CategoryEntity[];
	categoryTransactions: Record<
		CategoryEntity['id'],
		CategoryTransactionsEntity[]
	>;
	loading: boolean;
	allCategoriesLoaded: boolean;
}

const initialState: CategoryState = {
	categories: [],
	loading: false,
	allCategoriesLoaded: false,
	categoryTransactions: {},
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
	on(loadCategory, (state, _) => ({ ...state, loading: true })),
	on(addCategoryTransactions, (state, { categoryId, transactions }) => ({
		...state,
		categoryTransactions: {
			...state.categoryTransactions,
			[categoryId]: transactions,
		},
	}))
);

export const CategoryFeature = createFeature({
	name: categoryFeatureKey,
	reducer: categoryReducer,
});
