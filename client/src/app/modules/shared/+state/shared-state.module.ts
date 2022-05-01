import { NgModule } from '@angular/core';
import { UserEffects, UserFeature } from './user.store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [
		EffectsModule.forFeature([UserEffects]),
		StoreModule.forFeature(UserFeature),
	],
})
export class SharedStateModule {}
