import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesModuleRoutingModule } from './services-module-routing.module';

import { AddUserRequestComponent } from './add-user-request/add-user-request.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [
   
    AddUserRequestComponent,
         ScheduleComponent
  ],
  imports: [
    CommonModule,
    ServicesModuleRoutingModule,
    SharedModule
  ]
})
export class ServicesModuleModule { }
