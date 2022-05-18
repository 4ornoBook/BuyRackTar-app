import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
	{
		path: '',
		component: UsersTableComponent,
	},
	{
		path: 'create',
		component: UserCreateComponent,
	},
	{
		path: ':id/edit',
		component: UserEditComponent,
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UsersRoutingModule {}
