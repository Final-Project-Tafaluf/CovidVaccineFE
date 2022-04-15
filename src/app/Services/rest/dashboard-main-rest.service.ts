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


  numberOfUser():any{
    this.spinner.show();
    return this.http.get('https://localhost:44327/User/GetAllUsers/').toPromise().then( (res)=>{
      this.user=res;
      this.spinner.hide();
      return this.user;
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
      return err.message;
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

  numberOfCenter(){
    this.spinner.show();
    this.http.get('https:/localhost:44327/api/CenterVaccine/GetallCenterVaccines').subscribe((res)=>{
      this.centersData=res;
      debugger
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

  numberOfFizer(){
    this.spinner.show();
    this.http.get('https://localhost:44327/api/CenterVaccine/NumberOfFizer/').subscribe((res)=>{
      this.fizer=res;
      this.spinner.hide();
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }
  numberOfSinopharm(){
    this.spinner.show();
    this.http.get('https://localhost:44327/api/CenterVaccine/NumberOfSinopharm/').subscribe((res)=>{
      this.sinopharm=res;
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
      debugger
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }

}
