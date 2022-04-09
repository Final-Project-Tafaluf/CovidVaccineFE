import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageUsersRestService } from 'src/app/Services/rest/manage-users-rest.service';

@Component({
  selector: 'app-dashboard-manage-users',
  templateUrl: './dashboard-manage-users.component.html',
  styleUrls: ['./dashboard-manage-users.component.scss']
})
export class DashboardManageUsersComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  @ViewChild('callDeleteDialog') callDetailsDialog! :TemplateRef<any>

  user:any={}
  userInfo:any={}
  first_Name:any=''
  /* userDetails:any */

  constructor(private dialog:MatDialog, public manageUsersRestService:ManageUsersRestService) { }

  ngOnInit(): void {
    this.manageUsersRestService.getAllUser();

  }

  /* inputValue(ev:any){
    this.first_Name=ev.target.value;
    console.log(ev.target.value);
  } */

  /* search(){
    // debugger;
    this.manageUsersRestService.getbyName(this.first_Name.toString());
    } */

    CreateForm :FormGroup =new FormGroup
  (
    {
    first_Name:new FormControl(),
    last_Name:new FormControl(),
    ssn:new FormControl(),
    gender:new FormControl(),
    birthdate:new FormControl(),
    address:new FormControl(),
    image:new FormControl(),
    phone:new FormControl(),
    email:new FormControl(),
    password:new FormControl(),
    username:new FormControl(),
    role:new FormControl(),
    }
  )

  /* CreateForm :FormGroup =new FormGroup
  (
    {
      ssn:new FormControl(),
      first_Name:new FormControl(),
      last_Name:new FormControl(),
      gender:new FormControl(),
      birthdate:new FormControl(),
      address:new FormControl(),
      phone:new FormControl(),
      email:new FormControl(),
      image:new FormControl(),
      username:new FormControl()
    }
  ) */
  openCreateDialog(){
    this.dialog.open(this.callCreateDialog)
  }
  save(){
    this.manageUsersRestService.createUser(this.CreateForm.value);
    console.log(this.userInfo);

   /*  window.location.reload(); */
  }


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
    dose_Number : new FormControl(),
    role_Id : new FormControl(),
  })
  openUpdateDialog(
    id1 :any,first_Name1 :any,last_Name1 :any,ssn1 :any,gender1:any,birthdate1:any,
    address1 :any,phone1:any,email1:any,password1:any,username1:any,image1:any,dose:any,role:any){
      this.user={
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
      dose_Number:dose,
      role_Id : role
    }
    this.UpdateForm.controls['id'].setValue(this.user.id)
    this.UpdateForm.controls['ssn'].setValue(this.user.ssn)
    this.UpdateForm.controls['email'].setValue(this.user.email)
    this.UpdateForm.controls['password'].setValue(this.user.email)
    this.UpdateForm.controls['role_Id'].setValue(this.user.role_Id)
    debugger
    this.dialog.open(this.callUpdateDialog)
  }

  updateUser(){
    this.manageUsersRestService.updateUser(this.UpdateForm.value);
    console.log(this.user);
    /* window.location.reload(); */
  }




  uploadFile(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.manageUsersRestService.uploadAttachment(fromData);
  }


  openDeleteDialog(id:any){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes"){
        this.manageUsersRestService.delete(id);
        debugger
        this.manageUsersRestService.getAllUser();
      }
        else if(res=="no")
        console.log("Thank you ");
      }
    })
  }

  /* openDetailsDialog(user:any){
    this.userDetails=user;
    const dialogRef=this.dialog.open(this.callDetailsDialog);

  } */


}
