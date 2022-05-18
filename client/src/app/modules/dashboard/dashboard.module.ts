import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLabelModule } from '@taiga-ui/core';
import { SharedModule } from '../shared/shared.module';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TransactionsChartComponent } from './components/transactions-chart/transactions-chart.component';
import { TuiAxesModule, TuiBarChartModule } from '@taiga-ui/addon-charts';

@NgModule({
	declarations: [TableComponent, TransactionsChartComponent],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		TuiRadioLabeledModule,
		ReactiveFormsModule,
		TuiLabelModule,
		SharedModule,
		TuiLetModule,
		TuiAxesModule,
		TuiBarChartModule,
	],
})
export class DashboardModule {}
