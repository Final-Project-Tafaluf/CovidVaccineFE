import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserRequestComponent } from './add-user-request/add-user-request.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: "request-vac",
    component:AddUserRequestComponent
  },
  {
    path: "my-schedule",
    component:ScheduleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesModuleRoutingModule { }
