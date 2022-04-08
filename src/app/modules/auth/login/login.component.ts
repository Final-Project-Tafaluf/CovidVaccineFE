import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from 'src/app/Services/rest/home.service';
import { AuthService } from 'src/app/Services/rest/auth-rest.service';
import { UserProfileRestService } from 'src/app/Services/rest/user-profile-rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl(localStorage.getItem("email"),[Validators.required,Validators.email]);
  password = new FormControl(localStorage.getItem("password"));

  isCheckedLocal = localStorage.getItem("isChecked") == "true" ? true : false;
  isChecked =  new FormControl(this.isCheckedLocal);
  user:any={}



  constructor(private spinner :NgxSpinnerService, private router:Router,
    public home:HomeService, public auth:AuthService,public userProfileRestService:UserProfileRestService) {}
  ngOnInit(): void {
    console.log("this.isCheckedLocal",this.isCheckedLocal)
    console.log("this.isChecked",this.isChecked)

  }
  CreateForm :FormGroup =new FormGroup
  (
    {
    first_Name:new FormControl('', [Validators.required]),
    last_Name:new FormControl('', [Validators.required]),
    ssn:new FormControl('', [Validators.required]),
    gender:new FormControl('', [Validators.required]),
    birthdate:new FormControl('', [Validators.required]),
    address:new FormControl('', [Validators.required]),
    image:new FormControl(),
    phone:new FormControl(''),
    email:new FormControl('', [Validators.required,Validators.email]),
    password:new FormControl('', [Validators.required,Validators.minLength(8)]),
    username:new FormControl('', [Validators.required]),
    role:new FormControl('', [Validators.required]),
    }
  )
  public myError = (controlName: string, errorName:
    string) => {
    return
    this.CreateForm.controls[controlName].hasError(errorName);
    }
    
  uploadFile(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.userProfileRestService.uploadAttachment(fromData);
  }
  save(){
    this.userProfileRestService.createUser(this.CreateForm.value);
  }
  submit(){
    this.auth.submit(this.email,this.password);
    }

    goToRegister(){
      this.spinner.show();
      this.router.navigate(['security/register'])
      this.spinner.hide();
    }

   

}
