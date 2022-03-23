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
  email = new FormControl(localStorage.getItem("email"),[Validators.required,Validators.email]);
  password = new FormControl(localStorage.getItem("password"),[Validators.required,Validators.minLength(8)]);

  isCheckedLocal = localStorage.getItem("isChecked") == "true" ? true : false;
  isChecked =  new FormControl(this.isCheckedLocal);

  constructor(private spinner :NgxSpinnerService, private router:Router) {}
  ngOnInit(): void {
    // this.email = new FormControl() localStorage.getItem("email");
    console.log("this.isCheckedLocal",this.isCheckedLocal)
    console.log("this.isChecked",this.isChecked)

  }

  Onsubmit(){
    console.log(this.email.value);
    console.log(this.password.value);
    if( this.isChecked.value==true){
    localStorage.setItem("email" , this.email.value);
    localStorage.setItem("password" , this.password.value);
    localStorage.setItem("isChecked",JSON.stringify(this.isChecked.value));
    }else{
      localStorage.setItem("email" , "");
      localStorage.setItem("password" , "");
      localStorage.setItem("isChecked",JSON.stringify(this.isChecked.value));
    }
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)
  }
  goToRegister(){
    this.router.navigate(['security/register'])
  }

}
