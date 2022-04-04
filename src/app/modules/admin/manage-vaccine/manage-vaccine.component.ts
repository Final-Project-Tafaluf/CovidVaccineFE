import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageVaccineRestService } from 'src/app/Services/rest/manage-vaccine-rest.service';
import { CreateVaccineComponent } from '../create-vaccine/create-vaccine.component';

@Component({
  selector: 'app-manage-vaccine',
  templateUrl: './manage-vaccine.component.html',
  styleUrls: ['./manage-vaccine.component.scss']
})
export class ManageVaccineComponent implements OnInit {
  @ViewChild('callUpdateDailog') callUpdateDailog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDailog! :TemplateRef<any>
  constructor(private dialog:MatDialog, public manageVaccineRestService:ManageVaccineRestService) { }
vaccine:any;
  ngOnInit(): void {
    this.manageVaccineRestService.getAll();
  }
  create()
  {
    this.dialog.open(CreateVaccineComponent);
  }
 
  

  openUpdateDailog(id1 :any,
    vaccine_Type1 :any){

     this.vaccine={
       id:id1,
       vaccine_Type:vaccine_Type1,
     }
     this.UpdateForm.controls['id'].setValue(this.vaccine.id)
     this.dialog.open(this.callUpdateDailog);
   }

   UpdateForm:FormGroup=new FormGroup({
     id:new FormControl('',Validators.required),
     vaccine_Type: new FormControl('',Validators.required)
  })
  
  update(){
    this.manageVaccineRestService.updateVaccine(this.UpdateForm.value);
    this.dialog.closeAll();
  }

  openDeleteDailog(id:number)
  {
      const dialogRef=this.dialog.open(this.callDeleteDailog);
      dialogRef.afterClosed().subscribe((result)=>{
        if(result!=undefined)
        {
          if(result=='yes')
          this.manageVaccineRestService.deleteViccine(id);
          else if(result=='no'){
            console.log("Thank you ");
            this.dialog.closeAll();
          }
        }
      })
      
  }

}
