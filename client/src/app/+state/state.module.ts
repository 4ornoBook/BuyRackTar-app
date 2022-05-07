import { NgModule } from '@angular/core';
import { UserEffects, UserFeature } from './user.store';
import { CurrencyEffects, CurrencyFeature } from './currency.store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoryFeature, CategoryEffects } from './category.store';

@NgModule({
	imports: [
		EffectsModule.forFeature([
			UserEffects,
			CurrencyEffects,
			CategoryEffects,
		]),
		StoreModule.forFeature(UserFeature),
		StoreModule.forFeature(CurrencyFeature),
		StoreModule.forFeature(CategoryFeature),
	],
})
export class StateModule {}
