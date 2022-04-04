import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageHealthCenterRestService } from 'src/app/Services/rest/manage-health-center-rest.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateHealthCenterComponent } from '../create-health-center/create-health-center.component';

@Component({
  selector: 'app-manage-health-center',
  templateUrl: './manage-health-center.component.html',
  styleUrls: ['./manage-health-center.component.scss']
})
export class ManageHealthCenterComponent implements OnInit {

  @ViewChild('callUpdateDailog') callUpdateDailog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDailog! :TemplateRef<any>
  constructor(private dialog:MatDialog, public manageHealthCenterRestService:ManageHealthCenterRestService) { }
  center:any={};
  ngOnInit(): void {
    this.manageHealthCenterRestService.getAll();
  }

  create()
  {
    this.dialog.open(CreateHealthCenterComponent);
  }

  openUpdateDailog(id1 :any,
    center_Name1 :any,center_Phone1:any,center_Location1:any){
     console.log(id1,center_Name1);
     this.center={
       id:id1,
       center_Name:center_Name1,
       center_Phone:center_Phone1,
       center_Location:center_Location1,
      
     }
     console.log(this.center);
     this.UpdateForm.controls['id'].setValue(this.center.id)
     this.dialog.open(this.callUpdateDailog);
   }

   UpdateForm:FormGroup=new FormGroup({
     id:new FormControl(),
     center_Name: new FormControl(),
    center_Phone:new FormControl(),
    center_Location:new FormControl(),
    centerVaccines:new FormControl(),
    scheduals:new FormControl()
  })
  // uploadImage(file:any){
  //   if(file.length===0)
  //   return;
  //   const uploadfile=<File>file[0];
  //   // {
  //   //   file[0]:'photo1.png',
  //   // }
  //   const formData=new FormData();
  //   formData.append('file',uploadfile,uploadfile.name);
  //   this.home.uploadAttachment(formData);
  // }
  update(){
    this.manageHealthCenterRestService.updateHeathCenter(this.UpdateForm.value);
  }
  openDeleteDailog(id:number)
  {
      const dialogRef=this.dialog.open(this.callDeleteDailog);
      dialogRef.afterClosed().subscribe((result)=>{
        if(result!=undefined)
        {
          if(result=='yes')
          this.manageHealthCenterRestService.deleteItem(id);
          else if(result=='no')
          console.log("Thank you ");
          
        }
      })
  }
}
