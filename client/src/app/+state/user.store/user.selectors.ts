import { UserFeature } from './user.reducer';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from '../../entities/User.entity';

const selectUser = (
	store: Store,
	userId$: Observable<number>
): Observable<UserEntity | null> => {
	return combineLatest([store.select(UserFeature.selectUsers), userId$]).pipe(
		map(([users, userId]) => users.find(user => user.id === userId) || null)
	);
};

export const UserSelectors = {
	selectAccount: UserFeature.selectAccount,
	selectUsers: UserFeature.selectUsers,
	selectUser: selectUser,
	selectCurrentUser: UserFeature.selectCurrentUser,
};
