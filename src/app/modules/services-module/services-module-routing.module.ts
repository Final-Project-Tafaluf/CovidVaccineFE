import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserRequestComponent } from './add-user-request/add-user-request.component';

const routes: Routes = [
  {
    path: "add-user-request",
    component:AddUserRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesModuleRoutingModule { }
