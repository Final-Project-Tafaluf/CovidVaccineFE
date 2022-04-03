import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/Services/rest/home.service';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  user:any={}
  userInfo:any={}
  first_Name:any=''

  constructor(private dialog:MatDialog, public home:HomeService) { }

  ngOnInit(): void {
    this.home.getAllUser();
  }
  inputValue(ev:any){
    this.first_Name=ev.target.value;
    console.log(ev.target.value);
  }

  search(){
    // debugger;
    this.home.getbyName(this.first_Name.toString());
    }

  CreateForm :FormGroup =new FormGroup
  (
    {
    first_Name:new FormControl(),
    last_Name:new FormControl(),
    gender:new FormControl(),
    birthdate:new FormControl(),
    address:new FormControl(),
    image:new FormControl(),
    phone:new FormControl()
    }
  )
  openCreateDialog(){
    this.dialog.open(this.callCreateDialog)
  }
  save(){
    this.home.createUser(this.CreateForm.value);
    console.log(this.userInfo);

    window.location.reload();
  }

  updatForm:FormGroup=new FormGroup
  (
    {
    id:new FormControl(),
    first_Name:new FormControl(),
    last_Name:new FormControl(),
    gender:new FormControl(),
    birthdate:new FormControl(),
    address:new FormControl(),
    image:new FormControl(),
    phone:new FormControl()
    }
  )
  openUpdateDialog(uid:any,fname:any,lname:any,ugender:any,bdate:any,uaddress:any,uimage:any,uphone:any)
  {
    this.user=
    {
      id : uid,
      first_Name:fname,
      last_Name:lname,
      gender:ugender,
      birthdate:bdate,
      address:uaddress,
      image:uimage,
      phone:uphone
    }
    this.updatForm.controls['id'].setValue(uid);
    this.dialog.open(this.callUpdateDialog)
  }

  updateUser(){
    this.home.updateUser(this.updatForm.value);
    console.log(this.user);
    window.location.reload();
  }
  uploadFile(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.uploadAttachment(fromData);
  }


  openDeleteDialog(id:any){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes"){
        this.home.delete(id);
        window.location.reload();
      }
        else if(res=="no")
        console.log("Thank you ");
      }
    })
  }




}
