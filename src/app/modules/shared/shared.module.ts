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
import { CheckScheduleStatusPipe } from 'src/app/Pipes/check-schedule-status.pipe';
import {MatSelectModule} from '@angular/material/select';
import { TranslatePipe } from 'src/app/Pipes/translate.pipe';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomeDatePipe,
    CheckScheduleStatusPipe,
    TranslatePipe

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
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule
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
    CheckScheduleStatusPipe,
    TranslatePipe,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule
  ]
})
export class SharedModule { }
