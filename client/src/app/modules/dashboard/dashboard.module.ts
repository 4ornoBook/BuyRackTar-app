import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { DashboardRoutingModule } from './dashboard.routing';

@NgModule({
	declarations: [TableComponent],
	imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
