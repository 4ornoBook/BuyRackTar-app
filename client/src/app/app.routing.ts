import { DefaultLayoutComponent } from 'routing/layout/default-layout/default-layout.component';
import { NotFoundPageComponent } from 'routing/not-found-page/not-found-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/auth/auth.module').then(m => m.AuthModule),
		data: {
			animation: 'auth',
		},
	},
	{
		path: '',
		component: DefaultLayoutComponent,
		data: {
			title: 'Home',
			animation: 'dashboard',
		},
		children: [
			{
				path: 'dashboard',
				loadChildren: () =>
					import('./modules/dashboard/dashboard.module').then(
						m => m.DashboardModule
					),
			},
			{
				path: 'categories',
				loadChildren: () =>
					import('./modules/category/category.module').then(
						m => m.CategoryModule
					),
			},
			{
				path: 'wallets',
				loadChildren: () =>
					import('./modules/wallet/wallet.module').then(
						m => m.WalletModule
					),
			},
			{
				path: 'users',
				loadChildren: () =>
					import('./modules/users/users.module').then(
						m => m.UsersModule
					),
			},
		],
	},
	{
		path: '**',
		component: NotFoundPageComponent,
		data: { animation: 'not-found' },
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
