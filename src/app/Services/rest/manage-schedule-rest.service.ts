import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ScheduleRestService } from './schedule-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ManageScheduleRestService {

  constructor(private http:HttpClient,private spinner :NgxSpinnerService,private toastr:ToastrService,private scheduleRestService:ScheduleRestService) { }

  data :any ={};
  email :any ={};
  getAll(){
    this.spinner.show();
    this.http.get('https:/localhost:44327/api/Schedual/GetallScheduals').subscribe((res)=>{
      this.data=res;
      // debugger
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }

  getPending(){
    this.http.get('https:/localhost:44327/api/Schedual/GetPendingSchedual').subscribe((res)=>{
      this.email=res;
    }, err=>{
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }
  sendEmail(){
    //debugger
    this.http.get('https:/localhost:44327/api/Schedual/GetPendingSchedual').subscribe((res)=>{
      this.email=res;
      //debugger
    })
    this.http.post('https://localhost:44327/api/Schedual/SendEmail/',this.email).subscribe((result)=>{
      //debugger
            this.toastr.success('Send Successfully :)');

          },error=>{
            this.toastr.error(error.status,error.message);
          })
  }
  createSchedule(body:any){
    this.spinner.show();
    // debugger
    this.http.post('https://localhost:44327/api/Schedual/CreateSchedual/',body).subscribe((res)=>{
    // debugger
      this.spinner.hide();
      this.toastr.success('saved Successfully :)');
      this.getAll();

    },error=>{
      this.spinner.hide();
      this.toastr.error(error.status,error.message);
    })
  }

  updateSchedule(body:any){
    body.vaccine_id=Number(body.vaccine_id);
    body.center_id=Number(body.center_id);
    debugger
    this.http.put('https://localhost:44327/api/Schedual/UpdateSchedualAndVaccineNumber',body).subscribe(res=>
    {
      debugger
      this.toastr.success('updated Successfully');
      this.scheduleRestService.getAllSchedules();

    },err=>
    {
      this.toastr.error(err.status,err.message);
    })

  }

  deleteItem(id:number){
    // debugger
    this.http.delete('https://localhost:44327/api/Schedual/DeleteSchedual/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
    this.getAll();
    },err=>{
      this.toastr.error(err.status,err.message);
    })
  }

  SchedualSearch(data:any,dateFrom:any,dateTo:any){
    //show spinner
    this.spinner.show();
    //hits api
    // debugger;
    this.http.get('https://localhost:44327/api/Schedual/SchedualSearch/'+data+'/'+dateFrom+'/'+dateTo).subscribe((res)=>{
      this.data=res;
      // debugger
      console.log(this.data);

      this.spinner.hide();
      this.toastr.success('Data Retieved !!')
    }, err=>{
      //hide spinner
      this.spinner.hide();
       //Toastr
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
}

}
