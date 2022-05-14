import { UserFeature } from './user.reducer';

export const UserSelectors = {
	selectAccount: UserFeature.selectAccount,
	selectUsers: UserFeature.selectUsers,
	selectCurrentUser: UserFeature.selectCurrentUser,
};
