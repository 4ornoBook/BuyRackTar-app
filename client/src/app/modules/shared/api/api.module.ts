import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './services/account.service';

@NgModule({
	providers: [AccountService],
	imports: [CommonModule],
})
export class ApiModule {}
