import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { returnOrUpdate } from 'ol/extent';

@Injectable({
  providedIn: 'root'
})
export class ScheduleRestService {
  data:any;
  constructor(public spinner :NgxSpinnerService,
    public router:Router, private http :HttpClient,private toaster:ToastrService) {

     }
     getAllCenters():any{
      //show spinner
      this.spinner.show();
      //hits apidebugger

      return this.http.get('https://localhost:44327/api/healthcentervac/GetallHealthCenters').toPromise().then( (res)=>{
        debugger
         this.data=res;
       this.spinner.hide();
        this.toaster.success('Data Retrieved !!')
        return this.data;
      }, err=>{
        //hide spinner
        this.spinner.hide();
         //Toastr
        this.toaster.error(err.message);
        this.toaster.error(err.status);
        return err.message;
      })
      
    }

  
}
