import { NgModule } from '@angular/core';
import { ApiModule } from './api/api.module';
import { HelpersModule } from './helpers/helpers.module';
import { DividerComponent } from './components/divider/divider.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { CommonModule } from '@angular/common';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiLabelModule,
	TuiLinkModule,
	TuiLoaderModule,
	TuiSvgModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { SpendsFormComponent } from './components/spends-form/spends-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputNumberModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import { SpendsRingComponent } from './components/spends-ring/spends-ring.component';
import { TuiRingChartModule } from '@taiga-ui/addon-charts';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';

@NgModule({
	imports: [
		ApiModule,
		HelpersModule,
		CommonModule,
		TuiLoaderModule,
		RouterModule,
		TuiLinkModule,
		TuiSvgModule,
		ReactiveFormsModule,
		TuiDataListModule,
		TuiSelectModule,
		TuiFilterPipeModule,
		TuiLabelModule,
		TuiTextfieldControllerModule,
		TuiButtonModule,
		TuiInputNumberModule,
		TuiRingChartModule,
		TuiMoneyModule,
	],
	declarations: [
		DividerComponent,
		TransactionsTableComponent,
		SpendsFormComponent,
		SpendsRingComponent,
	],
	exports: [
		DividerComponent,
		TransactionsTableComponent,
		SpendsFormComponent,
		SpendsRingComponent,
	],
})
export class SharedModule {}
