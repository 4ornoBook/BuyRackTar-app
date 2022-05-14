import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSelectors, UserActions } from '+state/user.store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-users-table',
	templateUrl: './users-table.component.html',
	styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
	public users$ = this.store.select(UserSelectors.selectUsers);
	public currentUserId$ = this.store
		.select(UserSelectors.selectCurrentUser)
		.pipe(map(user => user?.id));

	constructor(private store: Store, private router: Router) {}

	public setCurrentUser(userId: number) {
		this.store.dispatch(UserActions.setCurrentUser({ userId }));
		this.router.navigate(['dashboard']);
	}
}
