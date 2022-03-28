import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { HomeComponent } from './components/home/home.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModuleModule } from './modules/dashboard-module/dashboard-module.module';
import { ServicesModuleModule } from './modules/services-module/services-module.module';



const routes: Routes = [
  {
    path:'about',
    component:AboutusComponent
  },
  {
    path:'contact',
    component:ContactusComponent
  },
  {
    path:'testimonial',
    component:TestimonialComponent
  },
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'security',
    loadChildren:()=>AuthModule
  },
  {
    path:'admin',
    loadChildren:()=>AdminModule,
  },
  {
    path:'services',
    loadChildren:()=>ServicesModuleModule,
  },
  {
    path:'dashboard',
    loadChildren:()=>DashboardModuleModule,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
