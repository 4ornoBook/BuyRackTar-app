import { Component, Input } from '@angular/core';
import { MenuService } from 'routing/layout/menu.service';

@Component({
	selector: 'app-nav-item',
	templateUrl: './nav-item.component.html',
	styleUrls: ['./nav-item.component.css'],
})
export class NavItemComponent {
	@Input() expandable: boolean = false;
	@Input() title: string = '';
	@Input() link: string = '';

	public expanded: boolean = false;

	constructor(private menuService: MenuService) {}

	toggle() {
		this.expanded = !this.expanded;
	}

	hideSidebar() {
		this.menuService.hideMenu();
	}
}
