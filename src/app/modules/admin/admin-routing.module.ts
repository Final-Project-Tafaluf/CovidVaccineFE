import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CreateHealthCenterComponent } from './create-health-center/create-health-center.component';
import { CreateVaccineComponent } from './create-vaccine/create-vaccine.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardManageUsersComponent } from './dashboard-manage-users/dashboard-manage-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditAboutPageComponent } from './edit-about-page/edit-about-page.component';
import { EditContactUsPageComponent } from './edit-contact-us-page/edit-contact-us-page.component';
import { EditHomePageComponent } from './edit-home-page/edit-home-page.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ManageHealthCenterComponent } from './manage-health-center/manage-health-center.component';
import { ManageHealthcenterComponent } from './manage-healthcenter/manage-healthcenter.component';
import { ManageSchedulesComponent } from './manage-schedules/manage-schedules.component';
import { ManageUserRequestsComponent } from './manage-user-requests/manage-user-requests.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageVaccineComponent } from './manage-vaccine/manage-vaccine.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [

  {
    path:'dashboard',
    component:DashboardComponent
  },{
    path:'manageHealthCenter',
    component:ManageHealthcenterComponent
  },
  {
    path:'content',
    component:ContentComponent
  },
  {
    path:'createHealthCenter',
    component:CreateHealthCenterComponent
  },
  {
    path:'manageuser',
    component:ManageUserComponent
  },
  {
    path:'dashboardContent',
    component:DashboardContentComponent
  },
  {
    path:'manageUsers',
    component:DashboardManageUsersComponent
  },
  {
    path:'manageHealthCenter1',
    component:ManageHealthCenterComponent
  },
  {
    path:'manageVaccine',
    component:ManageVaccineComponent
  },
  {
    path:'editAboutPage',
    component:EditAboutPageComponent
  },
  {
    path:'manageContactUs',
    component:ManageContactUsComponent
  },
  {
    path:'editHomePage',
    component:EditHomePageComponent
  },
  {
    path:'editContactUsPage',
    component:EditContactUsPageComponent
  },
  {
    path:'manageSchedules',
    component:ManageSchedulesComponent
  },
  {
    path:'manageUserRequests',
    component:ManageUserRequestsComponent
  },
  {
    path:'createVaccine',
    component:CreateVaccineComponent
  },
  {
    path:'report',
    component:ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
