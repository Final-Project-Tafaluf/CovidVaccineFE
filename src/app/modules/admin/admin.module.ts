import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateHealthCenterComponent } from './create-health-center/create-health-center.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardManageUsersComponent } from './dashboard-manage-users/dashboard-manage-users.component';
import { ManageHealthCenterComponent } from './manage-health-center/manage-health-center.component';
import { ManageVaccineComponent } from './manage-vaccine/manage-vaccine.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { EditHomePageComponent } from './edit-home-page/edit-home-page.component';
import { ManageSchedulesComponent } from './manage-schedules/manage-schedules.component';
import { CreateVaccineComponent } from './create-vaccine/create-vaccine.component';
import { ReportComponent } from './report/report.component';
import { ManageCenterVaccineComponent } from './manage-center-vaccine/manage-center-vaccine.component';
import { ManangeUsersRequestsComponent } from './manange-users-requests/manange-users-requests.component';
import { YesNoPipe } from 'src/app/Pipes/yes-no.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateHealthCenterComponent,
    DashboardContentComponent,
    DashboardManageUsersComponent,
    ManageHealthCenterComponent,
    ManageVaccineComponent,
    ManageContactUsComponent,
    EditHomePageComponent,
    ManageSchedulesComponent,
    CreateVaccineComponent,
    ManageCenterVaccineComponent,
    ManangeUsersRequestsComponent,
    ReportComponent,
    YesNoPipe

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
