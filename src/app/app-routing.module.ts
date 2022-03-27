import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { ServicesModuleModule } from './services-module/services-module.module';
import { TestimonialComponent } from './testimonial/testimonial.component';



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
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
