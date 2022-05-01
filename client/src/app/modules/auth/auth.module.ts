import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing';
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
import { LoginComponent } from './components/login/login.component';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
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
})
export class AuthModule {}
