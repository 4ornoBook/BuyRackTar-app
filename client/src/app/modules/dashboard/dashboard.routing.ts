import { TableComponent } from './table/table.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		component: TableComponent,
		data: {
			title: 'lol',
		},
	},
	{
		path: '**',
		component: TableComponent,
		data: {
			title: 'lol',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
