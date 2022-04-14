import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CenterVaccineRestService {

  constructor(private http:HttpClient,
    private spinner :NgxSpinnerService,private toastr:ToastrService) { }

    data :any ={};
  getAll(){
    this.spinner.show();
    this.http.get('https:/localhost:44327/api/CenterVaccine/GetallCenterVaccines').subscribe((res)=>{
      this.data=res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }

  createCenterVaccine(body:any){
    this.spinner.show();
    this.http.post('https:/localhost:44327/api/CenterVaccine/CreateCenterVaccine/',body).subscribe((res)=>{
     
      this.spinner.hide();
      this.toastr.success('saved Successfully :)');
      this.getAll();
     
    },error=>{
      this.spinner.hide();
      this.toastr.error(error.status,error.message);
    })
  }

  updateCentervaccine(body:any){
    this.http.put('https://localhost:44327/api/CenterVaccine/UpdateCenterVaccine',body).subscribe((res)=>{
      this.toastr.success('updated Successfully :)');
     //  window.location.reload();
     this.getAll();
    },err=>{
      this.toastr.error(err.status,err.message);
    })

  }

  deleteItem(id:number){
    this.http.delete('https://localhost:44327/apiCenterVaccine/delete/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
     //  window.location.reload();
     this.getAll();
    },err=>{
      this.toastr.error(err.status,err.message);
    })
  }
}
