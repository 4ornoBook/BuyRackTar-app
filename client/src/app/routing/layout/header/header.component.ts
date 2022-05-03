import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserSelectors } from 'modules/shared/+state/user.store';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	sidebarToggled$ = this.menuService.toggled$;

	currentUser$ = this.store.select(UserSelectors.selectCurrentUser);

	constructor(
		private readonly menuService: MenuService,
		private readonly router: Router,
		private readonly store: Store
	) {}

	toggleMenu() {
		this.menuService.toggleMenu();
	}

	login() {
		this.router.navigate(['auth']);
	}
}
