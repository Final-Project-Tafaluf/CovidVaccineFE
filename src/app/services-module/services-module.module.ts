import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesModuleRoutingModule } from './services-module-routing.module';

import { AddUserRequestComponent } from './add-user-request/add-user-request.component';


@NgModule({
  declarations: [
   
    AddUserRequestComponent
  ],
  imports: [
    CommonModule,
    ServicesModuleRoutingModule
  ]
})
export class ServicesModuleModule { }
