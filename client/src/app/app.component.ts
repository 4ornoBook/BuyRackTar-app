import { Component,  } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'body',
	template: '<tui-root><router-outlet></router-outlet></tui-root>',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {}
