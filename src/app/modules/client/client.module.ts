import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';

import { EditProfileInfoComponent } from './edit-profile-info/edit-profile-info.component';
import { CertificateComponent } from './certificate/certificate.component';



@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileInfoComponent,
    CertificateComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
