import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CreateHealthCenterComponent } from './create-health-center/create-health-center.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardManageUsersComponent } from './dashboard-manage-users/dashboard-manage-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageAboutUsComponent } from './manage-about-us/manage-about-us.component';
import { ManageContactUsComponent } from './manage-contact-us/manage-contact-us.component';
import { ManageHealthCenterComponent } from './manage-health-center/manage-health-center.component';
import { ManageHealthcenterComponent } from './manage-healthcenter/manage-healthcenter.component';
import { ManageHomePageComponent } from './manage-home-page/manage-home-page.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageVaccineComponent } from './manage-vaccine/manage-vaccine.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

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
    path:'manageAboutUs',
    component:ManageAboutUsComponent
  },
  {
    path:'manageContactUs',
    component:ManageContactUsComponent
  },
  {
    path:'manageHomePage',
    component:ManageHomePageComponent
  },
  {
    path:'UpdateProfile',
    component:UpdateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
