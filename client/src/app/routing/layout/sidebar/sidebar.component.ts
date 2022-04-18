import { Component } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	sidebarToggled$ = this.menuSevice.toggled$;

	constructor(private menuSevice: MenuService) {}
}
