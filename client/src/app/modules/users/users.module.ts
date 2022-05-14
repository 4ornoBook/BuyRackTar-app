import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersRoutingModule } from './users.routing';

@NgModule({
	declarations: [UsersTableComponent],
	imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
