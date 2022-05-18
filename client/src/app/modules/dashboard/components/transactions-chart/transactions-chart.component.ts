import { Component, Input, OnChanges } from '@angular/core';
import { ceil, tuiPure } from '@taiga-ui/cdk';
import { CombinedTransaction } from '+state/transaction.store/interfaces/combined-transaction.interface';
import { TransactionTypes } from 'enums/transaction-type.enum';

const MONTHS = 12;

@Component({
	selector: 'app-transactions-chart',
	templateUrl: './transactions-chart.component.html',
	styleUrls: ['./transactions-chart.component.scss'],
})
export class TransactionsChartComponent implements OnChanges {
	@Input() transactionType: TransactionTypes = TransactionTypes.Category;
	@Input() transactions: CombinedTransaction[] = [];

	public spendings: number[][] = [];
	public destinations: string[] = [];

	public axisYSecondaryLabels: string[] = [];

	readonly axisXLabels = [
		'Dec',
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
	];

	ngOnChanges() {
		const transactions = this.getTypedTransactions();

		const groupedByDestination = transactions.reduce(
			(grouped: Record<string, number[]>, transaction) => {
				const month = new Date(transaction.time!).getMonth();
				if (!grouped[transaction.destination]) {
					grouped[transaction.destination] = new Array(MONTHS).fill(
						0,
						0,
						MONTHS
					);
				}

				grouped[transaction.destination][month] += transaction.amount!;

				return grouped;
			},
			{}
		);

		this.destinations = [];
		this.spendings = [];

		Object.entries(groupedByDestination).map(([destination, values]) => {
			this.destinations.push(destination);
			this.spendings.push(values);
		});

		this.destinations = [...this.destinations];
		this.spendings = [...this.spendings];

		this.axisYSecondaryLabels = [
			'',
			`${this.getMax(this.spendings) / 2}`,
			`${this.getMax(this.spendings)}`,
		];
	}

	getSetName(index: number): string {
		return this.destinations[index];
	}

	getBackground(index: number): string {
		return `var(--tui-chart-${index})`;
	}

	@tuiPure
	private getMax(value: number[][]): number {
		return ceil(
			value.reduce((max, value) => Math.max(...value, max), 0),
			-1
		);
	}

	private getTypedTransactions() {
		if (this.transactionType === TransactionTypes.Category) {
			return this.transactions
				.filter(tran => tran.category)
				.map(tran => ({
					...tran,
					destination: tran.category?.name as string,
				}));
		}

		return this.transactions
			.filter(tran => tran.toWallet)
			.map(tran => ({
				...tran,
				destination: tran.toWallet?.name as string,
			}));
	}
}
