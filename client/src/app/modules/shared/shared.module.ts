import { NgModule } from '@angular/core';
import { ApiModule } from './api/api.module';
import { HelpersModule } from './helpers/helpers.module';
import { DividerComponent } from './components/divider/divider.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { CommonModule } from '@angular/common';
import { TuiLinkModule, TuiLoaderModule, TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		ApiModule,
		HelpersModule,
		CommonModule,
		TuiLoaderModule,
		RouterModule,
		TuiLinkModule,
		TuiSvgModule,
	],
	declarations: [DividerComponent, TransactionsTableComponent],
	exports: [DividerComponent, TransactionsTableComponent],
})
export class SharedModule {}
