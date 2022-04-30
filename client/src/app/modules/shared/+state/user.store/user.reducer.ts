import { createFeature, createReducer, on } from '@ngrx/store';
import { setUser } from './user.actions';
import { UserEntity } from 'entities/User.entity';

export interface UserState {
	user: UserEntity | null;
}

export const initialState: UserState = {
	user: null,
};

export const userFeatureKey = 'user';

export const userReducer = createReducer(
	initialState,
	on(setUser, (_, { user }) => ({ user }))
);

export const userFeature = createFeature({
	name: userFeatureKey,
	reducer: userReducer,
});
