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
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isCheckedLocal = localStorage.getItem('isChecked') == 'true' ? true : false;
  isChecked = new FormControl(this.isCheckedLocal);
  user: any = {};

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public home: HomeService,
    public auth: AuthService,
    public userProfileRestService: UserProfileRestService
  ) {}
  ngOnInit(): void {
    console.log('this.isCheckedLocal', this.isCheckedLocal);
    console.log('this.isChecked', this.isChecked);
  }

  LoginForm: FormGroup = new FormGroup({
    user_identifier: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  CreateForm: FormGroup = new FormGroup({
    first_Name: new FormControl('', [Validators.required]),
    last_Name: new FormControl('', [Validators.required]),
    ssn: new FormControl('', [Validators.required]),
    gender: new FormControl(),
    birthdate: new FormControl(),
    address: new FormControl(),
    image: new FormControl(),
    phone: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirm_Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    username: new FormControl('', Validators.required),
    role: new FormControl(),
  });

  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    // file[0]:'angular.png';
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.userProfileRestService.uploadAttachment(fromData);
  }
  save() {
    // debugger
    this.userProfileRestService.createUser(this.CreateForm.value);
  }
  submit() {
    // debugger
    this.auth.submit(this.LoginForm.value);
  }

  goToRegister() {
    this.spinner.show();
    this.router.navigate(['security/register']);
    this.spinner.hide();
  }

  onChange() {
    if (
      this.CreateForm.controls['password'].value ==
      this.CreateForm.controls['confirm_Password'].value
    )
      this.CreateForm.controls['confirconfirm_Passwordmpassword'].setErrors(
        null
      );
    else
      this.CreateForm.controls['confirm_Password'].setErrors({
        mismatch: true,
      });
  }
}
