import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletSelectors, WalletActions } from '+state/wallet.store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';
import { UserSelectors } from '+state/user.store';

@UntilDestroy()
@Component({
	selector: 'app-wallet-table',
	templateUrl: './wallet-table.component.html',
	styleUrls: ['./wallet-table.component.css'],
})
export class WalletTableComponent implements OnInit {
	private account$ = this.store.select(UserSelectors.selectAccount);

	public wallets$ = this.store.select(WalletSelectors.selectWallets);
	public walletsLoading$ = this.store.select(WalletSelectors.selectLoading);

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.account$
			.pipe(
				untilDestroyed(this),
				filter(account => !!account)
			)
			.subscribe(() => this.store.dispatch(WalletActions.loadWallets()));
	}
}
