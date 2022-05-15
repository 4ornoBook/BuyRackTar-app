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
import {
	TuiFieldErrorModule,
	TuiInputModule,
	TuiIslandModule,
	TuiSelectModule,
} from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { SharedModule } from '../shared/shared.module';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';
import { WalletCreateComponent } from './components/wallet-create/wallet-create.component';
import { WalletEditComponent } from './components/wallet-edit/wallet-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';

@NgModule({
	declarations: [
		WalletTableComponent,
		WalletItemComponent,
		WalletViewComponent,
		WalletFormComponent,
		WalletCreateComponent,
		WalletEditComponent,
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
		ReactiveFormsModule,
		TuiFieldErrorModule,
		TuiInputModule,
		TuiSelectModule,
		TuiCurrencyPipeModule,
	],
})
export class WalletModule {}
