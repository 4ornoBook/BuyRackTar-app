import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersRoutingModule } from './users.routing';
import { UserItemComponent } from './components/user-item/user-item.component';
import {
	TuiButtonModule,
	TuiHintModule,
	TuiLoaderModule,
	TuiSvgModule,
} from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
	TuiFieldErrorModule,
	TuiInputModule,
	TuiIslandModule,
} from '@taiga-ui/kit';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		UsersTableComponent,
		UserItemComponent,
		UserFormComponent,
		UserEditComponent,
		UserCreateComponent,
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		TuiSvgModule,
		TuiButtonModule,
		TuiLoaderModule,
		TuiLetModule,
		TuiIslandModule,
		TuiHintModule,
		ReactiveFormsModule,
		TuiInputModule,
		TuiFieldErrorModule,
		RouterModule,
	],
})
export class UsersModule {}
