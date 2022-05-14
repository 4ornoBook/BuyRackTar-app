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
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotFoundPageComponent } from './routing/not-found-page/not-found-page.component';
import { DefaultLayoutComponent } from './routing/layout/default-layout/default-layout.component';
import { HeaderComponent } from './routing/layout/header/header.component';
import { SidebarComponent } from './routing/layout/sidebar/sidebar.component';
import { NavItemComponent } from './routing/layout/sidebar/components/nav-item/nav-item.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { ErrorInterceptor } from './modules/shared/api/interceptors/error.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StateModule } from './+state/state.module';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './modules/shared/api/services/auth.service';
import { jwtOptionsFactory } from './modules/auth/factories/jwt-options.factory';
import { loadSharedDataFactory } from './app.initializers';
import { Router } from '@angular/router';
import { UserRequestInterceptor } from './modules/shared/api/interceptors/user-request.interceptor';

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
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory,
				deps: [AuthService],
			},
		}),
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
			useClass: UserRequestInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
		{
			provide: APP_INITIALIZER,
			useFactory: loadSharedDataFactory,
			deps: [AuthService, Store, JwtHelperService, Router],
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
