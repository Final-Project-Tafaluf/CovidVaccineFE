import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ManageVaccineRestService {
data:any;
  constructor(private spinner :NgxSpinnerService, private http:HttpClient, private toastr:ToastrService) { }

  getAll(){
    //show spinner
    this.spinner.show();
    //hits api
    this.http.get('https:/localhost:44327/api/Vaccine/GetallVaccines').subscribe((res)=>{
      this.data=res;
      this.spinner.hide();
      // this.toastr.success('Data Retrieved !!')
    }, err=>{
      //hide spinner
      this.spinner.hide();
       //Toastr
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
  }
  

  createVccine(body:any){
    this.spinner.show();
    this.http.post('https:/localhost:44327/api/Vaccine/CreateVaccine/',body).subscribe((res)=>{
     
      this.spinner.hide();
      this.toastr.success('saved Successfully :)');
      this.getAll();
     
    },error=>{
      this.spinner.hide();
      this.toastr.error(error.status,error.message);
    })
  }

  updateVaccine(body:any){
    this.http.put('https://localhost:44327/api/Vaccine/UpdateVaccine/',body).subscribe((res)=>{
      this.toastr.success('updated Successfully :)');
     //  window.location.reload();
     this.getAll();
    },err=>{
      this.toastr.error(err.status,err.message);
    })

  }

    deleteViccine(id:number){
      this.http.delete('https://localhost:44327/api/Vaccine/delete/'+id).subscribe((res)=>{
        this.toastr.success('Deleted Successfully :)');
       //  window.location.reload();
       this.getAll();
      },err=>{
        this.toastr.error(err.status,err.message);
      })
    }
}
