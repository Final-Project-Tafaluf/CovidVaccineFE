import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfileRestService } from 'src/app/Services/rest/user-profile-rest.service';

@Component({
  selector: 'app-edit-profile-info',
  templateUrl: './edit-profile-info.component.html',
  styleUrls: ['./edit-profile-info.component.scss']
})
export class EditProfileInfoComponent implements OnInit {

/*   @Input() id :number|undefined
  @Input()first_Name :string|undefined
  @Input() gender :string|undefined 
  @Input() birthdate :string="N/A" 
  @Input() address :string|undefined
  @Input() phone :string|undefined
  @Input() image :string|undefined
  @Input() email :string|undefined
  @Input() password:string|undefined */

  constructor(public userProfileRestService:UserProfileRestService) { }
  userProfile:any={};
  ngOnInit(): void {
  }

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


  
  openUpdateDialog(){
     
     this.UpdateForm.controls['id'].setValue(this.userProfile.id)
     
}

}