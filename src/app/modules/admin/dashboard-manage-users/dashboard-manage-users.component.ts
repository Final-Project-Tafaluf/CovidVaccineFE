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


  updatForm:FormGroup=new FormGroup
  (
    {
    id:new FormControl(),
    ssn:new FormControl(),
    first_Name:new FormControl(),
    last_Name:new FormControl(),
    gender:new FormControl(),
    birthdate:new FormControl(),
    address:new FormControl(),
    phone:new FormControl(),
    email:new FormControl(),
    image:new FormControl(),
    username:new FormControl(),
    dose_Number:new FormControl()
    }
  )
  openUpdateDialog(uid:any,ussn:any,fname:any,lname:any,ugender:any,bdate:any,uaddress:any,uphone:any,uemail:any,uimage:any,uusername:any,dnumber:any)
  {
    this.user=
    {
      id : uid,
      ssn:ussn,
      first_Name:fname,
      last_Name:lname,
      gender:ugender,
      birthdate:bdate,
      address:uaddress,
      phone:uphone,
      email:uemail,
      image:uimage,
      username:uusername,
      dose_Number:dnumber
    }
    this.updatForm.controls['id'].setValue(uid);
    this.dialog.open(this.callUpdateDialog)
  }

  updateUser(){
    this.manageUsersRestService.updateUser(this.updatForm.value);
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
        window.location.reload();
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
