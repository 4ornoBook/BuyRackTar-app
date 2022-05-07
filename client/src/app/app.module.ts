import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
	TuiRootModule,
	TuiDialogModule,
	TuiButtonModule,
	TuiSvgModule,
	TuiExpandModule,
	TuiLabelModule,
	TuiLinkModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotFoundPageComponent } from './routing/not-found-page/not-found-page.component';
import { DefaultLayoutComponent } from './routing/layout/default-layout/default-layout.component';
import { HeaderComponent } from './routing/layout/header/header.component';
import { SidebarComponent } from './routing/layout/sidebar/sidebar.component';
import { NavItemComponent } from './routing/layout/sidebar/components/nav-item/nav-item.component';
import { AuthInterceptor } from './modules/shared/api/interceptors/auth.interceptor';
import { TuiInputModule } from '@taiga-ui/kit';
import { ErrorInterceptor } from './modules/shared/api/interceptors/error.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StateModule } from './+state/state.module';

@NgModule({
	declarations: [
		AppComponent,
		NotFoundPageComponent,
		DefaultLayoutComponent,
		HeaderComponent,
		SidebarComponent,
		NavItemComponent,
	],
	imports: [
		BrowserModule,
		StoreModule.forRoot({}, {}),
		EffectsModule.forRoot([]),
		TuiRootModule,
		BrowserAnimationsModule,
		TuiDialogModule,
		TuiButtonModule,
		TuiSvgModule,
		AppRoutingModule,
		DashboardModule,
		AuthModule,
		SharedModule,
		TuiExpandModule,
		HttpClientModule,
		TuiInputModule,
		TuiLabelModule,
		TuiLinkModule,
		StateModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
