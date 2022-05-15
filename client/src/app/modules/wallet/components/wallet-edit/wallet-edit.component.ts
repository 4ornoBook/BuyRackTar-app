import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
	ID_FROM_ROUTE,
	ID_FROM_ROUTE_PROVIDERS,
} from 'modules/shared/helpers/routing-helper';
import { filter, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WalletSelectors, WalletActions } from '+state/wallet.store';
import { FormActs } from 'enums/form-acts.enum';
import { WalletEditDto } from '+state/wallet.store/interfaces/wallet-edit.dto';

@UntilDestroy()
@Component({
	selector: 'app-wallet-edit',
	templateUrl: './wallet-edit.component.html',
	styleUrls: ['./wallet-edit.component.css'],
	providers: [ID_FROM_ROUTE_PROVIDERS],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletEditComponent implements OnInit {
	public wallet$ = WalletSelectors.selectSimpleWallet(
		this.store,
		this.walletId$
	);

	public FormActs = FormActs;

	constructor(
		private store: Store,
		@Inject(ID_FROM_ROUTE) public walletId$: Observable<number>
	) {}

	ngOnInit() {
		this.walletId$
			.pipe(
				untilDestroyed(this),
				filter(categoryId => !!categoryId)
			)
			.subscribe(walletId => {
				this.store.dispatch(WalletActions.loadWallet({ walletId }));
			});
	}

	updateWallet(walletEdit: WalletEditDto): void {
		const { id, ...walletDto } = walletEdit;

		this.store.dispatch(
			WalletActions.updateWallet({
				walletId: id as number,
				walletDto,
			})
		);
	}
}
