import { NgModule } from '@angular/core';
import { UserEffects, userFeature } from './user.store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [
		EffectsModule.forFeature([UserEffects]),
		StoreModule.forFeature(userFeature),
	],
})
export class SharedStateModule {}
