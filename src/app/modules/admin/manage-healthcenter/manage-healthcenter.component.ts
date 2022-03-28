import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/Service/home.service';
import { CreateHealthCenterComponent } from '../create-health-center/create-health-center.component';

@Component({
  selector: 'app-manage-healthcenter',
  templateUrl: './manage-healthcenter.component.html',
  styleUrls: ['./manage-healthcenter.component.scss']
})
export class ManageHealthcenterComponent implements OnInit {

  @ViewChild('callUpdateDailog') callUpdateDailog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDailog! :TemplateRef<any>
  constructor(private dialog:MatDialog, public home:HomeService) { }
  center:any={};

  ngOnInit(): void {
    this.home.getAll();
  }
  create()
  {
    this.dialog.open(CreateHealthCenterComponent);
  }
  openUpdateDailog(id1 :any,
    center_Name1 :any,center_Phone1:any,center_Locatoin1:any){
     console.log(id1,center_Name1);
     this.center={
       id:id1,
       center_Name:center_Name1,
       center_Phone:center_Phone1,
       center_Locatoin:center_Locatoin1,
      
     }
     console.log(this.center);
     this.UpdateForm.controls['id'].setValue(this.center.id)
     this.dialog.open(this.callUpdateDailog);
   }

   UpdateForm:FormGroup=new FormGroup({
     id:new FormControl(),
     center_Name: new FormControl(),
    center_Phone:new FormControl(),
    center_Locatoin:new FormControl(),
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
    this.home.updateHeathCenter(this.UpdateForm.value);
  }
  openDeleteDailog(id:number)
  {
      const dialogRef=this.dialog.open(this.callDeleteDailog);
      dialogRef.afterClosed().subscribe((result)=>{
        if(result!=undefined)
        {
          if(result=='yes')
          this.home.deleteItem(id);
          else if(result=='no')
          console.log("Thank you ");
          
        }
      })
  }
}
//