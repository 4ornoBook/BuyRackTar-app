import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './services/account.service';
import { CurrencyService } from './services/currency.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';

@NgModule({
	providers: [AccountService, CurrencyService, AuthService, CategoryService],
	imports: [CommonModule],
})
export class ApiModule {}
