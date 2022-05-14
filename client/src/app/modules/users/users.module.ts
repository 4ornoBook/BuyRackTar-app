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
import { TuiIslandModule } from '@taiga-ui/kit';

@NgModule({
	declarations: [UsersTableComponent, UserItemComponent],
	imports: [
		CommonModule,
		UsersRoutingModule,
		TuiSvgModule,
		TuiButtonModule,
		TuiLoaderModule,
		TuiLetModule,
		TuiIslandModule,
		TuiHintModule,
	],
})
export class UsersModule {}
