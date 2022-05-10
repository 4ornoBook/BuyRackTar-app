import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-divider',
	templateUrl: './divider.component.html',
	styleUrls: ['./divider.component.css'],
})
export class DividerComponent {
	@Input() height: 1 | 2 | 3 | 4 | 5 = 2;

	constructor() {}

	public getClass() {
		return `divider-${this.height}`;
	}
}
