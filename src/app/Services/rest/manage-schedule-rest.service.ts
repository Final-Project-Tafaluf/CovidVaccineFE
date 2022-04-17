import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ManageScheduleRestService {

  constructor(private http:HttpClient,private spinner :NgxSpinnerService,private toastr:ToastrService) { }

  data :any ={};
  getAll(){
    this.spinner.show();
    this.http.get('https:/localhost:44327/api/Schedual/GetallScheduals').subscribe((res)=>{
      this.data=res;
      debugger
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }

  createSchedule(body:any){
    this.spinner.show();
    debugger
    this.http.post('https:/localhost:44327/api/Schedual/CreateSchedual/',body).subscribe((res)=>{
debugger
      this.spinner.hide();
      this.toastr.success('saved Successfully :)');
      this.getAll();

    },error=>{
      this.spinner.hide();
      this.toastr.error(error.status,error.message);
    })
  }

  updateSchedule(body:any){
    debugger
    this.http.put('https://localhost:44327/api/Schedual/UpdateSchedual',body).subscribe(res=>
    {
      debugger
      this.toastr.success('updated Successfully');
      this.getAll();
    },err=>
    {
      this.toastr.error(err.status,err.message);
    })

  }

  deleteItem(id:number){
    debugger
    this.http.delete('https://localhost:44327/api/Schedual/DeleteSchedual/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
    this.getAll();
    },err=>{
      this.toastr.error(err.status,err.message);
    })
  }

}
