import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageHealthCenterRestService } from 'src/app/Services/rest/manage-health-center-rest.service';
import { ManageScheduleRestService } from 'src/app/Services/rest/manage-schedule-rest.service';
import { ManageVaccineRestService } from 'src/app/Services/rest/manage-vaccine-rest.service';

@Component({
  selector: 'app-manage-schedules',
  templateUrl: './manage-schedules.component.html',
  styleUrls: ['./manage-schedules.component.scss']
})
export class ManageSchedulesComponent implements OnInit {

  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>


  CreateForm:FormGroup=new FormGroup({
    dose: new FormControl(),
    status:new FormControl(),
    start_Time:new FormControl(),
    end_Time:new FormControl(),
    center_Id:new FormControl(),
    user_Id:new FormControl(),
    doctor_name:new FormControl(),
    vaccine_id:new FormControl(),
    dose_taken_date:new FormControl()

  })

  UpdateForm:FormGroup=new FormGroup({
    id: new FormControl(),
    dose: new FormControl(),
    status:new FormControl(),
    start_Time:new FormControl(),
    end_Time:new FormControl(),
    center_Id:new FormControl(),
    user_Id:new FormControl(),
    doctor_name:new FormControl(),
    vaccine_id:new FormControl(),
    dose_taken_date:new FormControl()
  })

  schedule : any ={}

  constructor(private dialog:MatDialog,
    public manageScheduleRestService:ManageScheduleRestService,
    public manageHealthCenterRestService:ManageHealthCenterRestService,
    public manageVaccineRestService:ManageVaccineRestService) { }

  ngOnInit(): void {
    this.manageScheduleRestService.getAll();
    this.manageHealthCenterRestService.getAll();
    this.manageVaccineRestService.getAll();
  }

  save(){
    this.manageScheduleRestService.createSchedule(this.CreateForm.value);
debugger
  }

  update(){
    this.manageScheduleRestService.updateSchedule(this.UpdateForm.value);
    console.log(this.schedule);
  }

  openCreateDialog(){
    this.dialog.open(this.callCreateDialog);
  }


  openUpdateDialog(data:any){
      this.schedule={
        id:data.id,
        dose:data.dose,
        status:data.status,
        start_Time:data.start_Time,
        end_Time:data.end_Time,
        center_Id:data.center_Id,
        user_Id:data.user_Id,
        doctor_name:data.doctor_name,
        vaccine_id:data.vaccine_id,
        dose_taken_date:data.dose_taken_date
    }
    this.UpdateForm.controls['id'].setValue(this.schedule.id)
    this.UpdateForm.controls['user_Id'].setValue(this.schedule.user_Id)
    debugger
    this.dialog.open(this.callUpdateDialog)
  }


  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);

    dialogRef.afterClosed().subscribe((result) =>
      {
        if (result != undefined)
        {
          if (result == 'yes') this.manageScheduleRestService.deleteItem(id);

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
