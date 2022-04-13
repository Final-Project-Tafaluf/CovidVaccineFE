import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './modules/shared/shared.module';
import { TestimonialComponent } from './components/testimonial/testimonial.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    ContactusComponent,
    AboutusComponent,
    HomeComponent,
    TestimonialComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      NgxSpinnerModule,
      SharedModule,
      ToastNoAnimationModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-bottom-center',
        preventDuplicates: true,
      }),
      HttpClientModule
      ],
  
  providers: [],
  bootstrap: [AppComponent],schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
