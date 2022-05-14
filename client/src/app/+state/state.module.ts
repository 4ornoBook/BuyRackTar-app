import { NgModule } from '@angular/core';
import { UserEffects, UserFeature } from './user.store';
import { CurrencyEffects, CurrencyFeature } from './currency.store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoryFeature, CategoryEffects } from './category.store';
import { WalletEffects, WalletFeature } from './wallet.store';

@NgModule({
	imports: [
		EffectsModule.forFeature([
			UserEffects,
			CurrencyEffects,
			CategoryEffects,
			WalletEffects,
		]),
		StoreModule.forFeature(UserFeature),
		StoreModule.forFeature(CurrencyFeature),
		StoreModule.forFeature(CategoryFeature),
		StoreModule.forFeature(WalletFeature),
	],
})
export class StateModule {}
