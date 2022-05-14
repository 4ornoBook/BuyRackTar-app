import { createSelector, Store } from '@ngrx/store';
import { CurrencySelectors } from '+state/currency.store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WalletFeature } from './wallet.reducer';
import { WalletEntity } from '../../entities/Wallet.entity';
import {
	WalletInterface,
	WalletWithTransactions,
} from './interfaces/wallet.interface';

const selectWallets = createSelector(
	WalletFeature.selectWallets,
	CurrencySelectors.selectCurrencies,
	(wallets, currencies): WalletInterface[] => {
		return wallets.map(wallet => {
			return {
				id: wallet.id,
				name: wallet.name,
				userId: wallet.userId,
				amount: wallet.amount,
				currency: currencies.find(
					curr => curr.id === wallet.currencyId
				),
			};
		});
	}
);

const selectWallet = (
	store: Store,
	walletId$: Observable<number>
): Observable<WalletInterface | null> => {
	return combineLatest([store.select(selectWallets), walletId$]).pipe(
		map(
			([wallets, walletId]) =>
				wallets.find(wal => wal.id === walletId) as WalletInterface
		)
	);
};

const selectSimpleWallet = (
	store: Store,
	walletId$: Observable<number>
): Observable<WalletEntity | null> => {
	return combineLatest([
		store.select(WalletFeature.selectWallets),
		walletId$,
	]).pipe(
		map(
			([wallets, walletId]) =>
				wallets.find(wal => wal.id === walletId) || null
		)
	);
};

export const WalletSelectors = {
	selectSimpleWallet: selectSimpleWallet,
	selectWallet: selectWallet,
	selectWallets: selectWallets,
	selectLoading: WalletFeature.selectLoading,
};
