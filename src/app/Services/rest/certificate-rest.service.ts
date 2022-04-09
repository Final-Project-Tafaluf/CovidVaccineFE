import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CertificateRestService {
  data :any; 
  constructor(private spinner :NgxSpinnerService, private http:HttpClient, private toastr:ToastrService) { }

  createCertificate(data:any){
    this.spinner.show();
    // debugger;
    this.http.post('https://localhost:44327/api/Certificate/CreateCertificate',data).subscribe((res)=>{
      console.log('done');
      this.spinner.hide();
      this.toastr.success('Sent Successfully :) ')
    }, err=>{
      console.log('faild');
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }


  getAllCertificate(){
    //show spinner
    this.spinner.show();
    //hits api
    this.http.get('https://localhost:44327/api/Certificate/GetallCertificates/').subscribe((res)=>{
      // debugger
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

  updatebytestimonial(body:any){
    debugger
   // body.image_path=this.display_image;
    this.http.put('https://localhost:44327/api/Certificate/UpdateCertificate/',body).subscribe((res)=>{
      this.toastr.success('updated succefully')
      this.getAllCertificate();
    }, err=>{
      this.toastr.error(err.status,err.message);
    });
  }  

  deleteItem(id:number){
    this.http.delete('https://localhost:44327/api/Certificate/DeleteCertificate/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
      window.location.reload();
    },err=>{
      this.toastr.error(err.status,err.message);
    })
  }

  getUserRequest(id: any): any {
    //show spinner
    this.spinner.show();
    //hits apidebugger
    return this.http
      .get(
        'https://localhost:44327/api/Certificate/GetCertificateByUserId/' +
          id
      )
      .toPromise()
      .then(
        (res) => {
          debugger;
          this.data = res;
          this.spinner.hide();
          this.toastr.success('Data Retrieved !!');
          return this.data;
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toastr.error(err.message);
          this.toastr.error(err.status);
          return err.message;
        }
      );
  }





  ////////////////////
  GetCertificateById(id: number) {
    //show spinner
    this.spinner.show();
    //hits api
    // debugger;
    this.http.get('https://localhost:44327/api/Certificate/getcertificatebyid/' + id).subscribe(
      (res) => {
        this.data = res;
        // debugger
        this.spinner.hide();
        this.toastr.success('Data Retieved !!');
      },
      (err) => {
        //hide spinner
        this.spinner.hide();
        //Toastr
        this.toastr.error(err.message);
        this.toastr.error(err.status);
      }
    );
  }
//////////////END
}
