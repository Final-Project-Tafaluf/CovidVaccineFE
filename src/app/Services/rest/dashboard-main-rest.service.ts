import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DashboardMainRestService {
  
  constructor(private http:HttpClient,
    private spinner :NgxSpinnerService,private toastr:ToastrService) { }
    data:any;
  getAll():any{
    //show spinner
    this.spinner.show();
    //hits api
    debugger
    return this.http.get('https://localhost:44327/User/GetAllUsers/').toPromise().then( (res)=>{
      debugger
      this.data=res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
      return this.data;
    }, err=>{
      //hide spinner
      this.spinner.hide();
       //Toastr
      this.toastr.error(err.message);
      this.toastr.error(err.status);
      return err.message;
    })
  }

}
