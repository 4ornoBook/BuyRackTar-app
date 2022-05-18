import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
	ID_FROM_ROUTE,
	ID_FROM_ROUTE_PROVIDERS,
} from 'modules/shared/helpers/routing-helper';
import { filter, Observable } from 'rxjs';
import { FormActs } from 'enums/form-acts.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserSelectors, UserActions } from '+state/user.store';
import { UserEditDto } from '+state/user.store/interfaces/user-edit.dto';

@UntilDestroy()
@Component({
	selector: 'app-suer-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers: [ID_FROM_ROUTE_PROVIDERS],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit {
	public user$ = UserSelectors.selectUser(this.store, this.userId$);

	public FormActs = FormActs;

	constructor(
		private store: Store,
		@Inject(ID_FROM_ROUTE) public userId$: Observable<number>
	) {}

	ngOnInit() {
		this.userId$
			.pipe(
				untilDestroyed(this),
				filter(userId => !!userId)
			)
			.subscribe(userId => {
				this.store.dispatch(UserActions.getAccountUser({ userId }));
			});
	}

	updateUser(userEdit: UserEditDto): void {
		const { id, ...userDto } = userEdit;

		this.store.dispatch(
			UserActions.updateUser({
				userId: id as number,
				userDto,
			})
		);
	}
}
