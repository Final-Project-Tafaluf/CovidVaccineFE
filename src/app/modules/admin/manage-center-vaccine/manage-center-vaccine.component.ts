import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CenterVaccineRestService } from 'src/app/Services/rest/center-vaccine-rest.service';
import { ManageHealthCenterRestService } from 'src/app/Services/rest/manage-health-center-rest.service';
import { ManageVaccineRestService } from 'src/app/Services/rest/manage-vaccine-rest.service';

@Component({
  selector: 'app-manage-center-vaccine',
  templateUrl: './manage-center-vaccine.component.html',
  styleUrls: ['./manage-center-vaccine.component.scss']
})
export class ManageCenterVaccineComponent implements OnInit {

  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>

  info:any = ''

  CreateForm:FormGroup=new FormGroup({
    number_Of_Vaccine: new FormControl('', [Validators.required]),
    expire_Date:new FormControl('', [Validators.required]),
    center_Id:new FormControl('', [Validators.required]),
    vaccine_Id:new FormControl('', [Validators.required])
  })

  UpdateForm:FormGroup=new FormGroup({
    id: new FormControl('', [Validators.required]),
    number_Of_Vaccine: new FormControl('', [Validators.required]),
    expire_Date:new FormControl('', [Validators.required]),
    center_Id:new FormControl('', [Validators.required]),
    vaccine_Id:new FormControl('', [Validators.required])
  })

  health : any ={}
  constructor(
    private dialog:MatDialog,
    public centerVaccineRestService : CenterVaccineRestService,
    public manageVaccineRestService:ManageVaccineRestService,
    public manageHealthCenterRestService:ManageHealthCenterRestService) { }

  ngOnInit(): void {
    this.centerVaccineRestService.getAll();
    this.manageHealthCenterRestService.getAll();
    this.manageVaccineRestService.getAll();
    // debugger
  }

  save(){
    this.centerVaccineRestService.createCenterVaccine(this.CreateForm.value);
// debugger
  }

  update(){
    this.centerVaccineRestService.updateCentervaccine(this.UpdateForm.value);
  }

  openCreateDialog(){
    this.dialog.open(this.callCreateDialog);
  }

  openUpdateDialog(data:any){
      this.health={
        id:data.id,
        number_Of_Vaccine:data.number_Of_Vaccine,
        expire_Date:data.expire_Date,
        center_Id:data.center_Id,
        vaccine_Id:data.vaccine_Id
    }

    this.UpdateForm.controls['id'].setValue(this.health.id)
    this.UpdateForm.controls['center_Id'].setValue(this.health.center_Id)
    this.UpdateForm.controls['vaccine_Id'].setValue(this.health.vaccine_Id)
    this.UpdateForm.controls['number_Of_Vaccine'].setValue(this.health.number_Of_Vaccine)
    this.UpdateForm.controls['expire_Date'].setValue(this.health.expire_Date)
    // debugger
    this.dialog.open(this.callUpdateDialog)
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

  inputValue(ev:any){
    this.info=ev.target.value;
  }
  search(){

    this.centerVaccineRestService.searchCenterVaccine(this.info);
  }


}
