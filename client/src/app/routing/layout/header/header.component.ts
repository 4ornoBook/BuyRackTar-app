import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { AuthService } from 'modules/shared/api/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	sidebarToggled$ = this.menuService.toggled$;

	constructor(
		private readonly menuService: MenuService,
		private authService: AuthService
	) {}

	toggleMenu() {
		this.menuService.toggleMenu();
	}

	login() {
		this.authService
			.register({ email: '', password: '' })
			.subscribe();
	}
}
