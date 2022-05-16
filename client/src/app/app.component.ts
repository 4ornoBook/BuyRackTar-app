import { Component } from '@angular/core';
import { slideInAnimation } from './modules/shared/animations/slide-in.animation';
import { ChildrenOutletContexts } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'body',
	template: ` <tui-root>
		<!--		<div [@routeAnimation]="getRouteAnimationData()">-->
		<router-outlet></router-outlet>
		<!--		</div>-->
	</tui-root>`,
	styleUrls: ['./app.component.css'],
	animations: [slideInAnimation],
})
export class AppComponent {
	constructor(private contexts: ChildrenOutletContexts) {}

	// @tuiPure
	// getRouteAnimationData() {
	// 	return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
	// 		'animation'
	// 	];
	// }
}
