import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
=======
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomeDatePipe } from '../Pipes/custome-date.pipe';
>>>>>>> 095ceb037e8652ce257b608a844c526b0d7d4da9




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
<<<<<<< HEAD
    MatDialogModule,
    MatButtonModule
=======
    MatButtonModule,
    MatDialogModule
>>>>>>> 095ceb037e8652ce257b608a844c526b0d7d4da9
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
<<<<<<< HEAD
    MatDialogModule,
    MatButtonModule
=======
    MatButtonModule,
    MatDialogModule,
    CustomeDatePipe
>>>>>>> 095ceb037e8652ce257b608a844c526b0d7d4da9
  ]
})
export class SharedModule { }
