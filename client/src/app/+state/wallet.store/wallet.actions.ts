import { createAction, props } from '@ngrx/store';
import { WalletEntity } from '../../entities/Wallet.entity';
import { WalletDto } from './interfaces/wallet.dto';

const context = '[WALLET]';

export const loadWallets = createAction(`${context} load wallets`);

export const setWalletsLoading = createAction(`${context} set wallets loading`);
export const setUserWalletsLoaded = createAction(
	`${context} set user wallets loaded`,
	props<{ loaded: boolean }>()
);

export const setWallets = createAction(
	`${context} set wallets`,
	props<{ wallets: WalletEntity[] }>()
);

export const addWallet = createAction(
	`${context} add wallet`,
	props<{ wallet: WalletEntity }>()
);

export const loadWallet = createAction(
	`${context} load wallet`,
	props<{ walletId: number }>()
);

export const createWallet = createAction(
	`${context} create wallet`,
	props<{ walletDto: WalletDto }>()
);

export const updateWallet = createAction(
	`${context} update wallet`,
	props<{ walletId: number; walletDto: WalletDto }>()
);
