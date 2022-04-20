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
    data:any=[{}];
    user:any=[{}];
    centersData: any =[{}];
    vaccinesData: any=[{}];
    RequestsData: any =[{}];
    message:any =[{}];
    fizer:any =[{}];
    sinopharm:any =[{}];
    report:any =[{}];

getReport():any{
  this.spinner.show();
  this.http.get('https://localhost:44327/Report/GetReport/').subscribe((res)=>{
    this.report=res;
    // debugger
    this.spinner.hide();
  }, err=>{
    this.spinner.hide();
    this.toastr.error(err.message);
    this.toastr.error(err.status);
  })
}

  numberOfVaccien(){
    this.spinner.show();
    this.http.get('https:/localhost:44327/api/Vaccine/GetallVaccines').subscribe((res)=>{
      this.vaccinesData=res;
      this.spinner.hide();
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }

  numberOfMessage(){
    this.spinner.show();
    this.http.get('https://localhost:44327/api/ContactUs/getallcontactus/').subscribe((res)=>{
      this.message=res;
      this.spinner.hide();
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }

  getCenter(){
    this.spinner.show();
    this.http.get('https:/localhost:44327/api/CenterVaccine/GetallCenterVaccines').subscribe((res)=>{
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

}
