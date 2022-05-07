import { NgModule } from '@angular/core';
import { ApiModule } from './api/api.module';
import { HelpersModule } from './helpers/helpers.module';
import { DividerComponent } from './components/divider/divider.component';

@NgModule({
	imports: [ApiModule, HelpersModule],
	declarations: [DividerComponent],
	exports: [DividerComponent],
})
export class SharedModule {}
