import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('',[Validators.required,Validators.email]);
  password = new FormControl('',[Validators.required,Validators.minLength(8)]);
  constructor(private spinner :NgxSpinnerService, private router:Router) {}
  ngOnInit(): void {}
  Onsubmit(){
    console.log(this.email.value);
    console.log(this.password.value);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)
  }
  goToRegister(){
    this.router.navigate(['security/register'])
  }

}
