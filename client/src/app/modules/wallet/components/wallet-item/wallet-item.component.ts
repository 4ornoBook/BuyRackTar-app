import { Component, Input } from '@angular/core';
import { WalletInterface } from '+state/wallet.store/interfaces/wallet.interface';

@Component({
	selector: 'app-wallet-item',
	templateUrl: './wallet-item.component.html',
	styleUrls: ['./wallet-item.component.css'],
})
export class WalletItemComponent {
	@Input() wallet!: WalletInterface;

	constructor() {}
}
