import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from 'src/app/components/aboutus/aboutus.component';
import { ContactusComponent } from 'src/app/components/contactus/contactus.component';
import { HomeComponent } from 'src/app/components/home/home.component';

import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { ClientModule } from '../client/client.module';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
{
  path:'about',
    component:AboutusComponent
  }  ,{
    path:'contact',
    component:ContactusComponent
  },
  {
    path:'security',
    loadChildren:()=>AuthModule
  },


{
  path:'admin',
  loadChildren:()=>AdminModule,

}
// ,
// {
//   path:'client',
//   loadChildren:()=>ClientModule,

// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
