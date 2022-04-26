import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageHealthCenterRestService } from 'src/app/Services/rest/manage-health-center-rest.service';
import { ManageScheduleRestService } from 'src/app/Services/rest/manage-schedule-rest.service';
import { ManageVaccineRestService } from 'src/app/Services/rest/manage-vaccine-rest.service';
import { ScheduleRestService } from 'src/app/Services/rest/schedule-rest.service';

@Component({
  selector: 'app-manage-schedules',
  templateUrl: './manage-schedules.component.html',
  styleUrls: ['./manage-schedules.component.scss']
})
export class ManageSchedulesComponent implements OnInit {

  @ViewChild('callCreateDialog') callCreateDialog! :TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog! :TemplateRef<any>
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>

  dateFrom:any
  dateTo:any

  CreateForm:FormGroup=new FormGroup({
    dose: new FormControl('',Validators.required),
    status:new FormControl('',Validators.required),
    start_Time:new FormControl('',Validators.required),
    end_Time:new FormControl('',Validators.required),
    center_id:new FormControl('',Validators.required),
    user_Id:new FormControl('',Validators.required),
    vaccine_id:new FormControl('',Validators.required),
    // doctor_name:new FormControl(),
    // dose_taken_date:new FormControl()

  })

  UpdateForm:FormGroup=new FormGroup({
    id: new FormControl('',Validators.required),
    dose: new FormControl('',Validators.required),
    status:new FormControl('',Validators.required),
    start_Time:new FormControl('',Validators.required),
    end_Time:new FormControl('',Validators.required),
    center_id:new FormControl('',Validators.required),
    user_Id:new FormControl('',Validators.required),
    vaccine_id:new FormControl('',Validators.required),
    doctor_name:new FormControl(''),
    dose_taken_date:new FormControl('')
  })

  schedule : any ={}

  constructor(private dialog:MatDialog,
    public scheduleRestService :ScheduleRestService,
    public manageScheduleRestService:ManageScheduleRestService,
    public manageHealthCenterRestService:ManageHealthCenterRestService,
    public manageVaccineRestService:ManageVaccineRestService) { }

  ngOnInit(): void {
    this.scheduleRestService.getAllSchedules();
  }

  sendEmail(){
    this.manageScheduleRestService.sendEmail();
  }
  save(){
    this.scheduleRestService.createSchedule(this.CreateForm.value,false);
// debugger
  }

  update(){
    this.manageScheduleRestService.updateSchedule(this.UpdateForm.value);
    console.log(this.schedule);
  }

  async openCreateDialog(){
    this.CreateForm.controls['status'].setValue('Pending');
    await this.scheduleRestService.getAllCenters();
    this.dialog.open(this.callCreateDialog);
  }
  async handleChangeUser(user_Id:any){
    var checkLastUserTakenDose = await this.scheduleRestService.checkLastUserTakenDose(Number(user_Id.value));
    var dose = this.doseGenerator(checkLastUserTakenDose);
    this.CreateForm.controls['dose'].setValue(dose);
  }
  async handleChangeUserUpdate(user_Id:any){
    var checkLastUserTakenDose = await this.scheduleRestService.checkLastUserTakenDose(Number(user_Id));
    var dose = this.doseGenerator(checkLastUserTakenDose);
    this.UpdateForm.controls['dose'].setValue(dose);
  }
  async openUpdateDialog(data:any){
      this.schedule={
        id:data.id,
        dose:data.dose,
        status:data.status,
        start_Time:data.start_Time,
        end_Time:data.end_Time,
        center_id:data.center_Id,
        user_Id:data.user_Id,
        doctor_name:data.doctor_name,
        vaccine_id:data.vaccine_id,
        dose_taken_date:data.dose_taken_date
    }
    // debugger
    this.UpdateForm.controls['id'].setValue(this.schedule.id)
    this.UpdateForm.controls['user_Id'].setValue(this.schedule.user_Id)
    this.UpdateForm.controls['center_id'].setValue(this.schedule.center_id)
    await this.scheduleRestService.getVaccinesByCenterId(this.schedule.center_id);
    this.UpdateForm.controls['user_Id'].setValue(this.schedule.user_Id)
    this.UpdateForm.controls['dose'].setValue(this.schedule.dose)
    this.UpdateForm.controls['status'].setValue(this.schedule.status)
    this.UpdateForm.controls['vaccine_id'].setValue(this.schedule.vaccine_id)
    this.UpdateForm.controls['start_Time'].setValue(this.schedule.start_Time)
    this.UpdateForm.controls['end_Time'].setValue(this.schedule.end_Time)
    this.UpdateForm.controls['doctor_name'].setValue(this.schedule.doctor_name)
    this.UpdateForm.controls['dose_taken_date'].setValue(this.schedule.dose_taken_date)
    // debugger
    // this.handleChangeUserUpdate(this.schedule.user_Id)
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

  inputValue(ev:any){
    this.dateFrom=ev.target.value;
    // debugger
    console.log(ev.target.value);
  }
  inputValue1(ev1:any){
    this.dateTo=ev1.target.value;
    // debugger
    console.log(ev1.target.value);
  }

  async handleHealthCenterchange(center_id:any) {
    // debugger
    console.log("center_id",center_id.value)
    var filterdVaccines = await this.scheduleRestService.getVaccinesByCenterId(
      Number(center_id.value)
    );
    // debugger
    if (filterdVaccines.length > 0) {
      this.CreateForm.controls['vaccine_id'].enable();
    } else {
      this.CreateForm.controls['vaccine_id'].disable();
    }
  }
  doseGenerator(check:string){
    if (check == 'No') {
      return 'First';
    }
    else if (check == 'First') {
      return 'Second';      
    }
    else if (check == 'Second') {
      return '3rd';      
    }
    else if (check == '3rd') {
      return '';      
    }
    else{
      return '';      
    }
  }
  search(){
    // debugger;
    this.manageScheduleRestService.searchBetweenTwoDates(this.dateFrom,this.dateTo);
    }

}
