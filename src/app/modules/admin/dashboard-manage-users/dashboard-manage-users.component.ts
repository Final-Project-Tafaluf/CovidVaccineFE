import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  userProfile:any={}
  userInfo:any={}
  first_Name:any=''
  info:any = ''
  /* userDetails:any */

  constructor(private dialog:MatDialog, public manageUsersRestService:ManageUsersRestService) { }

  ngOnInit(): void {
    this.manageUsersRestService.getAllUser();

  }


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

  updateUser(){
    this.manageUsersRestService.updateUser(this.UpdateForm.value);
    console.log(this.userProfile);
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
        // debugger
        this.manageUsersRestService.getAllUser();
      }
        else if(res=="no")
        console.log("Thank you ");
      }
    })
  }
  inputValue(ev:any){
    this.info=ev.target.value;
  }
  search(){

    this.manageUsersRestService.searchUser(this.info);
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
