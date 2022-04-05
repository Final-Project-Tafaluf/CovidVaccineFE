import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfileRestService } from 'src/app/Services/rest/user-profile-rest.service';

@Component({
  selector: 'editProfile',
  templateUrl: './edit-profile-info.component.html',
  styleUrls: ['./edit-profile-info.component.scss']
})
export class EditProfileInfoComponent implements OnInit {


  UpdateForm:FormGroup=new FormGroup({
    id:new FormControl(),
    first_Name: new FormControl(),
    last_Name: new FormControl(),
    ssn: new FormControl(),
    gender:new FormControl(),
    birthdate:new FormControl(),
    address:new FormControl(),
    phone:new FormControl(),
    image:new FormControl(),
    email:new FormControl(),
    password:new FormControl(),
    username:new FormControl(),
  })

  constructor(public userProfileRestService:UserProfileRestService) { }
  userProfile:any={};
  ngOnInit(): void {
  }

  save(){
    this.userProfileRestService.updateUser(this.UpdateForm.value);
  }

  openUpdateDialog(){

     this.UpdateForm.controls['id'].setValue(this.userProfile.id)

}

}
