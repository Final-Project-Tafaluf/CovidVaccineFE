import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CreateHealthCenterComponent } from './create-health-center/create-health-center.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageHealthcenterComponent } from './manage-healthcenter/manage-healthcenter.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
