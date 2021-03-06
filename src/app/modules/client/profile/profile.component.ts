import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { HomeService } from 'src/app/Services/rest/home.service';
import { UserProfileRestService } from 'src/app/Services/rest/user-profile-rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>

  constructor(private dialog:MatDialog,public userProfileRestService:UserProfileRestService,
    private localStorageService:LocalStorageService) { }
  userProfile:any={};

  ngOnInit(): void {

    var token = this.localStorageService.getToken();
    var tokenData: any = this.localStorageService.tokenDecode(token);
    var userId : number = tokenData.nameid;
    this.userProfileRestService.getUserProfileInfoByID(userId);
  }
  UpdateForm:FormGroup=new FormGroup({
    id:new FormControl(),
    first_Name: new FormControl('',Validators.required),
    last_Name: new FormControl('',Validators.required),
    ssn: new FormControl(),
    gender:new FormControl('',Validators.required),
    birthdate:new FormControl('',Validators.required),
    address:new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    image:new FormControl(),
    email:new FormControl(),
    password:new FormControl(),
    username:new FormControl(),
    role_Id:new FormControl()
  })
  defaultPass: string = '';
  openUpdateDialog(
    id1 :any,first_Name1 :any,last_Name1 :any,ssn1 :any,gender1:any,birthdate1:any,
    address1 :any,phone1:any,email1:any,password1:any,username1:any,image1:any,role1:any){
      this.userProfile={
      id:id1,
      first_Name:first_Name1,
      last_Name:last_Name1,
      ssn:ssn1,
      gender:gender1,
      birthdate:birthdate1,
      address:address1,
      phone:phone1,
      email:email1,
      password:password1,
      username:username1,
      image:image1,
      role_Id:role1
    }
    // debugger
    this.UpdateForm.controls['id'].setValue(this.userProfile.id)
    this.UpdateForm.controls['ssn'].setValue(this.userProfile.ssn)
    this.UpdateForm.controls['email'].setValue(this.userProfile.email)
    this.UpdateForm.controls['username'].setValue(this.userProfile.username)
    this.UpdateForm.controls['role_Id'].setValue(this.userProfile.role_Id)
    this.dialog.open(this.callUpdateDialog,{
      panelClass: 'dialog-container-custom'
    });
  }

  Update(){
    this.userProfileRestService.updateUser(this.UpdateForm.value);
    // debugger
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


}
