import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import{HttpClient} from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactUsRestService {
  data :any; 
  constructor(private spinner :NgxSpinnerService, private http:HttpClient, private toastr:ToastrService) { }
  
 
  
  createContact(data:any){
    this.spinner.show();
    // debugger;
    this.http.post('https://localhost:44327/api/ContactUs/create_contactus/',data).subscribe((res)=>{
      console.log('done');
      this.spinner.hide();
      this.toastr.success('Sent Successfully :) ')
    }, err=>{
      console.log('faild');
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }

 


  getAllContact(){
    //show spinner
    this.spinner.show();
    //hits api
    this.http.get('https://localhost:44327/api/ContactUs/getallcontactus/').subscribe((res)=>{
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

  // updatebytestimonial(body:any){
  //   this.http.put('https://localhost:44327/api/ContactUs/update_CONTACT_feedback',body).subscribe((res)=>{
  //     this.toastr.success('updated Successfully :)');
  //    //  window.location.reload();
  //    this.getAllContact();
  //   },err=>{
  //     this.toastr.error(err.status,err.message);
  //   })

  // }

  updatebytestimonial(body:any){
    // debugger
   // body.image_path=this.display_image;
    this.http.put('https://localhost:44327/api/ContactUs/update_CONTACT_feedback/',body).subscribe((res)=>{
      this.toastr.success('updated succefully')
      this.getAllContact();
    }, err=>{
      this.toastr.error(err.status,err.message);
    });
  }

  deleteItem(id:number){
    this.http.delete('https://localhost:44327/api/ContactUs/delete/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
      window.location.reload();
    },err=>{
      this.toastr.error(err.status,err.message);
    })
  }
  getContactsBySubject(Subject:string){
    // debugger
    if (!Subject) {
      Subject='null';
    }
    this.http.get('https://localhost:44327/api/ContactUs/GetContactFeedbackBySubject/'+Subject).subscribe((res)=>{
      // debugger
      this.data=res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
    },err=>{
      this.toastr.error(err.status,err.message);
    })
  }




  getAllContactbytestimonial(){
    //show spinner
    this.spinner.show();
    //hits api
    this.http.get('https://localhost:44327/api/ContactUs/getallcontactusbytestimonial/').subscribe((res)=>{
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

}
