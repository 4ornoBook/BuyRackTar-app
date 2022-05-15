import { createFeature, createReducer, on } from '@ngrx/store';
import { setTransactions } from './transaction.actions';
import { CombinedTransaction } from './interfaces/combined-transaction.interface';

export interface UserState {
	transactions: CombinedTransaction[];
}

const initialState: UserState = {
	transactions: [],
};

export const transactionFeatureKey = 'transaction';

export const transactionReducer = createReducer(
	initialState,
	on(setTransactions, (state, { transactions }) => ({
		...state,
		transactions,
	}))
);

export const TransactionFeature = createFeature({
	name: transactionFeatureKey,
	reducer: transactionReducer,
});
