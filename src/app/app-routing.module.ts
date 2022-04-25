import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { HomeComponent } from './components/home/home.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { AutherizationGuard } from './gard/autherization.guard';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { DashboardModuleModule } from './modules/dashboard-module/dashboard-module.module';
import { ServicesModuleModule } from './modules/services-module/services-module.module';



const routes: Routes = [
  {
    path:'about',
    component:AboutusComponent
  },
  {
    path:'contact',
    component:ContactusComponent,
    canActivate:[AutherizationGuard]
  },
  {
    path:'testimonial', //Please remove me with my module and component
    component:TestimonialComponent
  },
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'security',
    loadChildren:()=>AuthModule
  },
  {
    path:'admin',
    loadChildren:()=>AdminModule,
    canActivate:[AutherizationGuard]
  },
  {
    path:'services',
    loadChildren:()=>ServicesModuleModule,
    canActivate:[AutherizationGuard]
  },
  {
    path:'dashboard', //Please remove me with my module and component
    loadChildren:()=>DashboardModuleModule,
  },
  {
    path:'client',
    loadChildren:()=>ClientModule,
    canActivate:[AutherizationGuard]   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
