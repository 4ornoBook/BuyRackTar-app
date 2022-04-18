import { Injectable, InjectionToken, Provider } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	private isToggled = new BehaviorSubject(false);
	public toggled$ = this.isToggled.asObservable();

	constructor() {}

	toggleMenu(): void {
		this.isToggled.next(!this.isToggled.value);
	}

	hideMenu(): void {
		this.isToggled.next(false);
	}
}

export const TOGGLED_MENU = new InjectionToken(
	'A stream with current menu toggled state'
);

export const MENU_PROVIDERS: Provider[] = [
	{
		provide: TOGGLED_MENU,
		deps: [MenuService],
		useFactory: menuToggledFactory,
	},
];

export function menuToggledFactory(
	menuService: MenuService
): Observable<boolean> {
	return menuService.toggled$;
}
