import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHealthCenterComponent } from './create-health-center/create-health-center.component';
import { CreateVaccineComponent } from './create-vaccine/create-vaccine.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardManageUsersComponent } from './dashboard-manage-users/dashboard-manage-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditHomePageComponent } from './edit-home-page/edit-home-page.component';
import { ManageCenterVaccineComponent } from './manage-center-vaccine/manage-center-vaccine.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ManageHealthCenterComponent } from './manage-health-center/manage-health-center.component';
import { ManageSchedulesComponent } from './manage-schedules/manage-schedules.component';
import { ManageVaccineComponent } from './manage-vaccine/manage-vaccine.component';
import { ManangeUsersRequestsComponent } from './manange-users-requests/manange-users-requests.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [

  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'manageHealthCenter1',
    component:ManageHealthCenterComponent
  },
  {
    path:'createHealthCenter',
    component:CreateHealthCenterComponent
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
    path:'manageVaccine',
    component:ManageVaccineComponent
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
    path:'manageSchedules',
    component:ManageSchedulesComponent
  },
  {
    path:'manageUsersRequests',
    component:ManangeUsersRequestsComponent
  },
  {
    path:'createVaccine',
    component:CreateVaccineComponent
  },
  {
    path:'report',
    component:ReportComponent
  },
  {
    path:'centerVaccine',
    component:ManageCenterVaccineComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
