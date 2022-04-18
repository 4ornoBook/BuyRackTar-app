import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import {
	TuiButtonModule,
	TuiHintControllerModule,
	TuiLabelModule,
	TuiNotificationsModule,
	TuiTextfieldControllerModule,
	TuiTooltipModule,
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
	TuiFieldErrorModule,
	TuiInputModule,
	TuiInputPasswordModule,
} from '@taiga-ui/kit';

export const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
];

@NgModule({
	declarations: [LoginComponent],
	imports: [
		RouterModule.forChild(routes),
		TuiLabelModule,
		ReactiveFormsModule,
		TuiTextfieldControllerModule,
		TuiInputModule,
		TuiTooltipModule,
		TuiFieldErrorModule,
		TuiHintControllerModule,
		TuiInputPasswordModule,
		TuiButtonModule,
		TuiNotificationsModule,
	],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
