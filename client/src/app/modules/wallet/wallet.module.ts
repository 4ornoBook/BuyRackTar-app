import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletTableComponent } from './components/wallet-table/wallet-table.component';
import { WalletItemComponent } from './components/wallet-item/wallet-item.component';
import { WalletViewComponent } from './components/wallet-view/wallet-view.component';
import { WalletRoutingModule } from './wallet.routing';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiDropdownControllerModule,
	TuiHostedDropdownModule,
	TuiLoaderModule,
	TuiSvgModule,
} from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		WalletTableComponent,
		WalletItemComponent,
		WalletViewComponent,
	],
	imports: [
		CommonModule,
		WalletRoutingModule,
		TuiLoaderModule,
		TuiIslandModule,
		TuiLetModule,
		SharedModule,
		TuiSvgModule,
		TuiDataListModule,
		TuiButtonModule,
		TuiDropdownControllerModule,
		TuiHostedDropdownModule,
	],
})
export class WalletModule {}
