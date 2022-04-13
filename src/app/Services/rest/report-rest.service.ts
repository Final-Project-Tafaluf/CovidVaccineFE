import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ReportRestService {
  data1 :any; 
  data2 :any; 
  data3 :any; 
  data4 :any; 

  constructor(private spinner :NgxSpinnerService, private http:HttpClient, private toastr:ToastrService) { }

  getNumberUser(){
    //show spinner
    this.spinner.show();
    //hits api
    this.http.get('https://localhost:44327/User/GetRegisteredUsersNumber/').subscribe((res)=>{
      this.data1=res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
    }, err=>{
      //hide spinner
      this.spinner.hide();
       //Toastr
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }

  //
  getNumberUsersrequestes(){
    //show spinner
    this.spinner.show();
    //hits api
    this.http.get('https://localhost:44327/api/UserRequest/GetNumberOfUserRequestes/').subscribe((res)=>{
      this.data2=res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
    }, err=>{
      //hide spinner
      this.spinner.hide();
       //Toastr
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }
//Vaccinated Patient
getNumberVaccinatedPatient(){
  //show spinner
  this.spinner.show();
  //hits api
  this.http.get('https://localhost:44327/api/Certificate/GetNumberOfCertificate/').subscribe((res)=>{
    this.data3=res;
    this.spinner.hide();
    this.toastr.success('Data Retrieved !!')
  }, err=>{
    //hide spinner
    this.spinner.hide();
     //Toastr
    this.toastr.error(err.message);
    this.toastr.error(err.status);
  })
}

getNumberHealthCentert(){
  //show spinner
  this.spinner.show();
  //hits api
  this.http.get('https://localhost:44327/api/healthcentervac/GetNumberOfHealthCenter/').subscribe((res)=>{
    this.data4=res;
    this.spinner.hide();
    this.toastr.success('Data Retrieved !!')
  }, err=>{
    //hide spinner
    this.spinner.hide();
     //Toastr
    this.toastr.error(err.message);
    this.toastr.error(err.status);
  })
}


  //END
}
