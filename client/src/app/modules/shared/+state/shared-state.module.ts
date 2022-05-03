import { NgModule } from '@angular/core';
import { UserEffects, UserFeature } from './user.store';
import { CurrencyEffects, CurrencyFeature } from './currency.store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [
		EffectsModule.forFeature([UserEffects, CurrencyEffects]),
		StoreModule.forFeature(UserFeature),
		StoreModule.forFeature(CurrencyFeature),
	],
})
export class SharedStateModule {}
