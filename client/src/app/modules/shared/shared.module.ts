import { NgModule } from '@angular/core';
import { ApiModule } from './api/api.module';
import { HelpersModule } from './helpers/helpers.module';
import { SharedStateModule } from './+state/shared-state.module';

@NgModule({
	imports: [ApiModule, HelpersModule, SharedStateModule],
})
export class SharedModule {}
