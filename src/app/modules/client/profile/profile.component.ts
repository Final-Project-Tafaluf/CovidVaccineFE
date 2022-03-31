import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileRestService } from 'src/app/Services/rest/user-profile-rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>

  constructor(private dialog:MatDialog,public userProfileRestService:UserProfileRestService) { }
  userProfile:any={};
  ngOnInit(): void {
    this.userProfileRestService.getUserProfileInfoByID(1);
  }









  /* ---------------------------------------------dialog section---------------------- */

   update(){
    this.userProfileRestService.updateUserProfile(this.UpdateForm.value);
  }


  UpdateForm:FormGroup=new FormGroup({
     id:new FormControl(),
     first_Name: new FormControl(),
     gender:new FormControl(),
     birthdate:new FormControl(),
     address:new FormControl(),
     phone:new FormControl(),
     image:new FormControl(),
     email:new FormControl(),
     password:new FormControl(),
     //username:new FormControl(),
  })

  

  openUpdateDialog(id1 :any,
    first_Name1 :any,gender1:any,birthdate1:any,address1 :any,phone1:any,email1:any,password1:any,username1:any){
      console.log(id1,first_Name1);
     this.userProfile={
       id:id1,
       first_Name:first_Name1,
       gender:gender1,
       birthdate:birthdate1,
       address:address1,
       phone:phone1,
       email:email1,
       password:password1,
       //username:username1,

     }
     console.log(this.userProfile);
     this.UpdateForm.controls['id'].setValue(this.userProfile.id)
     this.dialog.open(this.callUpdateDialog);
   }
  
  /* ---------------------------------------------End dialog section---------------------- */


}
