import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardPageModule { }
