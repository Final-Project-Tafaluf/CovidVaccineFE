import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CenterVaccineRestService } from 'src/app/Services/rest/center-vaccine-rest.service';

@Component({
  selector: 'app-manage-center-vaccine',
  templateUrl: './manage-center-vaccine.component.html',
  styleUrls: ['./manage-center-vaccine.component.scss']
})
export class ManageCenterVaccineComponent implements OnInit {

  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>


  CreateForm:FormGroup=new FormGroup({
    number_Of_Vaccine: new FormControl(),
    expire_Date:new FormControl(),
    center_Id:new FormControl(),
    vaccine_Id:new FormControl()
  })

  UpdateForm:FormGroup=new FormGroup({
    id: new FormControl(),
    number_Of_Vaccine: new FormControl(),
    expire_Date:new FormControl(),
    center_Id:new FormControl(),
    vaccine_Id:new FormControl()
  })

  health : any ={}
  constructor(private dialog:MatDialog,public centerVaccineRestService : CenterVaccineRestService) { }

  ngOnInit(): void {
    this.centerVaccineRestService.getAll();
  }

  save(){
    this.centerVaccineRestService.createCenterVaccine(this.CreateForm.value);
    console.log(this.health);

  }
  
  update(){
    this.centerVaccineRestService.updateCentervaccine(this.UpdateForm.value);
    console.log(this.health);
  }

  openCreateDialog(){
    this.dialog.open(this.callCreateDialog)
  }

  openUpdateDialog(data:any){
this.health = data;
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);

    dialogRef.afterClosed().subscribe((result) => 
      {
        if (result != undefined) 
        {
          if (result == 'yes') this.centerVaccineRestService.deleteItem(id);

          else if (result == 'no') 
          {
            console.log("Thank you ");
            this.dialog.closeAll();
          }
        }
      }
    )
  }

  
}
