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
	},
	{
		path: '',
		component: DefaultLayoutComponent,
		data: {
			title: 'Home',
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
		],
	},
	{ path: '**', component: NotFoundPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
