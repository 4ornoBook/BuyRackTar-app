import { Component, Input, OnChanges } from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { CombinedTransaction } from '+state/transaction.store/interfaces/combined-transaction.interface';
import { WalletInterface } from '+state/wallet.store/interfaces/wallet.interface';

export type Grouped = Record<string, number>;

@Component({
	selector: 'app-spends-ring',
	templateUrl: './spends-ring.component.html',
	styleUrls: ['./spends-ring.component.css'],
})
export class SpendsRingComponent implements OnChanges {
	@Input() transactionsSource: WalletInterface | null = null;
	@Input() transactions: CombinedTransaction[] = [];

	public groupedSpends: Grouped = {};

	constructor() {}

	ngOnChanges() {
		this.groupedSpends = this.getGroupedTransactionsSpends(
			this.transactions
		);
	}

	@tuiPure
	getRingValue(index: number): number {
		if (Number.isNaN(index)) {
			return this.countTransactionsTotal();
		}

		return Object.values(this.groupedSpends)[index];
	}

	@tuiPure
	getRingLabel(index: number): string {
		return Number.isNaN(index)
			? 'Total'
			: Object.keys(this.groupedSpends)[index];
	}

	public getRingChartValues() {
		return Object.values(this.groupedSpends);
	}

	private getGroupedTransactionsSpends(
		transactions: CombinedTransaction[]
	): Grouped {
		return transactions.reduce((grouped: Grouped, transaction) => {
			if (
				transaction.toWallet &&
				transaction.toWallet.id === this.transactionsSource?.id
			) {
				return grouped;
			}

			const amount = transaction.amount!;
			let name;
			if (transaction.category) {
				name = `${transaction.category?.name} (category)`;
			} else {
				name = `${transaction.toWallet?.name} (wallet)`;
			}

			const prev = grouped[name];
			grouped[name] = prev ? prev + amount : amount;

			return grouped;
		}, {});
	}

	private countTransactionsTotal() {
		return Object.values(this.groupedSpends).reduce(
			(total, value) => total + value,
			0
		);
	}
}
