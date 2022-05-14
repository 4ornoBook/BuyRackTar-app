import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WalletTableComponent } from './components/wallet-table/wallet-table.component';
import { WalletViewComponent } from './components/wallet-view/wallet-view.component';

export const routes: Routes = [
	{
		path: '',
		component: WalletTableComponent,
	},
	// {
	// 	path: 'create',
	// component: CategoryCreateComponent,
	// },
	// {
	// 	path: 'edit/:id',
	// 	component: CategoryEditComponent,
	// },
	{
		path: ':id',
		component: WalletViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WalletRoutingModule {}
