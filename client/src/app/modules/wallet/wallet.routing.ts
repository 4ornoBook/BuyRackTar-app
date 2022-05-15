import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WalletTableComponent } from './components/wallet-table/wallet-table.component';
import { WalletViewComponent } from './components/wallet-view/wallet-view.component';
import { WalletCreateComponent } from './components/wallet-create/wallet-create.component';
import { WalletEditComponent } from './components/wallet-edit/wallet-edit.component';

export const routes: Routes = [
	{
		path: '',
		component: WalletTableComponent,
	},
	{
		path: 'create',
		component: WalletCreateComponent,
	},
	{
		path: 'edit/:id',
		component: WalletEditComponent,
	},
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
