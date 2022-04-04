import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageHealthCenterRestService {
  message:string='Welcome in our Training Site :) ';
  selectedHealthCenter:any={};
  numberofActiveCenter =new BehaviorSubject(0);
  data:any=[{}];

  constructor(private http:HttpClient,
    private spinner :NgxSpinnerService,private toastr:ToastrService) { }

    getById(id:number){
      //show spinner 
      this.spinner.show();
      //hits Api 
        this.http.get('https://localhost:44327/api/healthcentervac/GetHealthCenterById/'+id).subscribe((res)=>{
        this.selectedHealthCenter=res;
        this.spinner.hide();
        this.toastr.success('Data Retrieved !!');
      },err=>{
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      })
      //hide spinner
      //res --> show toastr
   }
  
   getAll(){
     //show spinner
     this.spinner.show();
     //hits api
     this.http.get('https:/localhost:44327/api/healthcentervac/GetallHealthCenters').subscribe((res)=>{
       this.data=res;
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
   

   createHelthCenter(body:any){
     this.spinner.show();
     this.http.post('https:/localhost:44327/api/healthcentervac/CreateCenter/',body).subscribe((res)=>{
      
       this.spinner.hide();
       this.toastr.success('saved Successfully :)');
     },error=>{
       this.spinner.hide();
       this.toastr.error(error.status,error.message);
     })
   }
 
   updateHeathCenter(body:any){
     this.http.put('https://localhost:44327/api/healthcentervac/UpdateCenter',body).subscribe((res)=>{
       this.toastr.success('updated Successfully :)');
       window.location.reload();
     },err=>{
       this.toastr.error(err.status,err.message);
     })
 
   }
 
     deleteItem(id:number){
       this.http.delete('https://localhost:44327/api/healthcentervac/delete/'+id).subscribe((res)=>{
         this.toastr.success('Deleted Successfully :)');
         window.location.reload();
       },err=>{
         this.toastr.error(err.status,err.message);
       })
     }
    
 
     
 
}
