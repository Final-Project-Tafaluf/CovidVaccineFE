import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateHealthCenterComponent } from './create-health-center/create-health-center.component';
import { ManageHealthcenterComponent } from './manage-healthcenter/manage-healthcenter.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ContentComponent,
    DashboardComponent,
    CreateHealthCenterComponent,
    ManageHealthcenterComponent,
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
