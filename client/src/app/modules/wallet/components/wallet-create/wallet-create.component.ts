import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { WalletDto } from '+state/wallet.store/interfaces/wallet.dto';
import { WalletActions } from '+state/wallet.store';

@Component({
	selector: 'app-wallet-create',
	templateUrl: './wallet-create.component.html',
	styleUrls: ['./wallet-create.component.css'],
})
export class WalletCreateComponent {
	constructor(private store: Store) {}

	createWallet(walletForm: WalletDto): void {
		this.store.dispatch(
			WalletActions.createWallet({ walletDto: walletForm })
		);
	}
}
