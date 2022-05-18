import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDto } from '+state/user.store/interfaces/user.dto';
import { UserActions } from '+state/user.store';

@Component({
	selector: 'app-user-create',
	templateUrl: './user-create.component.html',
	styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
	constructor(private store: Store) {}

	createUser(userDto: UserDto) {
		this.store.dispatch(UserActions.createUser({ userDto }));
	}
}
