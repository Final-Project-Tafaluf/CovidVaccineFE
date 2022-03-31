import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CustomeDatePipe } from 'src/app/Pipes/custome-date.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomeDatePipe

  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    MatDialogModule,
    CustomeDatePipe,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class SharedModule { }
