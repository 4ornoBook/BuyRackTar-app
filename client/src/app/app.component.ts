import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrencyActions } from '+state/currency.store';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'body',
	template: '<tui-root><router-outlet></router-outlet></tui-root>',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(private readonly store: Store) {}

	ngOnInit() {
		this.store.dispatch(CurrencyActions.loadCurrencies());
	}
}
