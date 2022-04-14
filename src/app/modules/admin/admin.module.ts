import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateHealthCenterComponent } from './create-health-center/create-health-center.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardManageUsersComponent } from './dashboard-manage-users/dashboard-manage-users.component';
import { ManageHealthCenterComponent } from './manage-health-center/manage-health-center.component';
import { ManageVaccineComponent } from './manage-vaccine/manage-vaccine.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { EditHomePageComponent } from './edit-home-page/edit-home-page.component';
import { EditAboutPageComponent } from './edit-about-page/edit-about-page.component';
import { EditContactUsPageComponent } from './edit-contact-us-page/edit-contact-us-page.component';
import { ManageSchedulesComponent } from './manage-schedules/manage-schedules.component';
import { ManageUserRequestsComponent } from './manage-user-requests/manage-user-requests.component';
import { CreateVaccineComponent } from './create-vaccine/create-vaccine.component';
import { ReportComponent } from './report/report.component';
import { ManageCenterVaccineComponent } from './manage-center-vaccine/manage-center-vaccine.component';


@NgModule({
  declarations: [
    ContentComponent,
    DashboardComponent,
    CreateHealthCenterComponent,
    ManageUserComponent,
    DashboardContentComponent,
    DashboardManageUsersComponent,
    ManageHealthCenterComponent,
    ManageVaccineComponent,
    ManageContactUsComponent,
    EditHomePageComponent,
    EditAboutPageComponent,
    EditContactUsPageComponent,
    ManageSchedulesComponent,
    ManageUserRequestsComponent,
    CreateVaccineComponent,
    ReportComponent,
    ManageCenterVaccineComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
