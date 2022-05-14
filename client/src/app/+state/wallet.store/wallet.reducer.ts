import { createFeature, createReducer, on } from '@ngrx/store';
import {
	setWalletsLoading,
	addWallet,
	setWallets,
	loadWallet,
	setUserWalletsLoaded,
} from './wallet.actions';
import { WalletEntity } from 'entities/Wallet.entity';

export interface WalletState {
	wallets: WalletEntity[];
	loading: boolean;
	allWalletsLoaded: boolean;
}

const initialState: WalletState = {
	wallets: [],
	loading: false,
	allWalletsLoaded: false,
};

export const walletFeatureKey = 'wallet';

export const walletReducer = createReducer(
	initialState,
	on(setWallets, (state, { wallets }) => ({
		...state,
		wallets,
		loading: false,
		allWalletsLoaded: true,
	})),
	on(addWallet, (state, { wallet }) => ({
		...state,
		loading: false,
		wallets: [
			...state.wallets.filter(wal => wal.id !== wallet.id),
			wallet,
		].sort((a, b) => a.id - b.id),
	})),
	on(setWalletsLoading, (state, _) => ({ ...state, loading: true })),
	on(loadWallet, (state, _) => ({ ...state, loading: true })),
	on(setUserWalletsLoaded, (state, { loaded }) => ({
		...state,
		allWalletsLoaded: loaded,
	}))
);

export const WalletFeature = createFeature({
	name: walletFeatureKey,
	reducer: walletReducer,
});
