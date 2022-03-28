import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { AdminContactUsComponent } from './admin-contact-us/admin-contact-us.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AdminContactUsComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    MatIconModule,
    SharedModule
  ]
})
export class DashboardModuleModule { }
