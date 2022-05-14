import { UserFeature } from './transaction.reducer';

export const TransactionSelectors = {
	selectAccount: UserFeature.selectAccount,
	selectUsers: UserFeature.selectUsers,
	selectCurrentUser: UserFeature.selectCurrentUser,
};
