import { UserFeature } from './user.reducer';

export const UserSelectors = {
	selectAccount: UserFeature.selectAccount,
	selectCurrentUser: UserFeature.selectCurrentUser,
};
