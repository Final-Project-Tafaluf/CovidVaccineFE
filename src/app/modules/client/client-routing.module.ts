import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateComponent } from './certificate/certificate.component';
import { EditProfileInfoComponent } from './edit-profile-info/edit-profile-info.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {
    path:'MyProfile',
    component:ProfileComponent
  },
  {
    path:'EditProfile',
    component:EditProfileInfoComponent
  },
  {
    path:'certificate',
    component:CertificateComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
