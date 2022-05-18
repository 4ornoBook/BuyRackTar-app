import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryEditDto } from '+state/category.store/interfaces/category-edit.dto';
import { FormActs } from 'enums/form-acts.enum';
import { UserEntity } from 'entities/User.entity';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnChanges {
	@Input() formAct: FormActs = FormActs.Create;
	@Input() title: string = 'Create a user';
	@Input() user?: UserEntity | null;

	@Output() submitUser = new EventEmitter<CategoryEditDto>();

	public userForm: FormGroup = new FormBuilder().group({
		name: ['', [Validators.required]],
	});

	constructor() {}

	ngOnChanges() {
		this.userForm.patchValue(
			{
				...this.user,
			},
			{ onlySelf: true }
		);
	}

	submitForm() {
		if (this.userForm.invalid) {
			return;
		}

		this.submitUser.emit({
			id: this.user?.id || null,
			...this.userForm.getRawValue(),
		});
	}
}
