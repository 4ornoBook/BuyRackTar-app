import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserEntity } from 'entities/User.entity';

@Component({
	selector: 'app-user-item',
	templateUrl: './user-item.component.html',
	styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent {
	@Input() user!: UserEntity;
	@Input() isSelected: boolean = false;

	@Output() selectUser = new EventEmitter<number>();

	constructor() {}
}
