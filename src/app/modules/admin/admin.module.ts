import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateHealthCenterComponent } from './create-health-center/create-health-center.component';
import { ManageHealthcenterComponent } from './manage-healthcenter/manage-healthcenter.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardManageUsersComponent } from './dashboard-manage-users/dashboard-manage-users.component';
import { ManageHealthCenterComponent } from './manage-health-center/manage-health-center.component';
import { ManageVaccineComponent } from './manage-vaccine/manage-vaccine.component';
import { ManageAboutUsComponent } from './manage-about-us/manage-about-us.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ManageHomePageComponent } from './manage-home-page/manage-home-page.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';


@NgModule({
  declarations: [
    ContentComponent,
    DashboardComponent,
    CreateHealthCenterComponent,
    ManageHealthcenterComponent,
    ManageUserComponent,
    DashboardContentComponent,
    DashboardManageUsersComponent,
    ManageHealthCenterComponent,
    ManageVaccineComponent,
    ManageAboutUsComponent,
    ManageContactUsComponent,
    ManageHomePageComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
