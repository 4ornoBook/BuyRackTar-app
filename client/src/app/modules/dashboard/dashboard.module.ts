import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLabelModule } from '@taiga-ui/core';
import { SharedModule } from '../shared/shared.module';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
	declarations: [TableComponent],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		TuiRadioLabeledModule,
		ReactiveFormsModule,
		TuiLabelModule,
		SharedModule,
		TuiLetModule,
	],
})
export class DashboardModule {}
