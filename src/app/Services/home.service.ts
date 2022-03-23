import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import{HttpClient} from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  display_Image:any;
  selectedUser:any={};
  data:any=[{}]

  userdata:any={}
  constructor(private spinner :NgxSpinnerService, private http:HttpClient, private toastr:ToastrService) { }

  getbyName(name:any){
    //show spinner
    this.spinner.show();
    //hits api
    debugger;
    this.http.get('https://localhost:44327/User/GetUserByName/'+name).subscribe((res)=>{
      this.data=res;
      console.log(this.data);

      this.spinner.hide();
      this.toastr.success('Data Retieved !!')
    }, err=>{
      //hide spinner
      this.spinner.hide();
       //Toastr
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })
}

getAllUser(){
  //show spinner
  this.spinner.show();
  //hits api
  this.http.get('https://localhost:44327/User/AllUser/').subscribe((res)=>{
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

createUser(data:any){
  this.spinner.show();
  debugger;
  data.image=this.display_Image;
  this.http.post('https://localhost:44327/User/CreateUser/',data).subscribe((res)=>{
    console.log('done');
    this.spinner.hide();
    this.toastr.success('Saved Successfully :) ')
  }, err=>{
    console.log('faild');

    this.spinner.hide();
    this.toastr.error(err.message , err.status)
  })
}
updateUser(body:any){
  body.image=this.display_Image;
  this.http.put('https://localhost:44327/User/UpdateUser/',body).subscribe((res)=>{
    this.toastr.success('Updated Successfully :) ')
  },err=>{
    this.toastr.error('something error ');
  })
}

uploadAttachment(file:FormData)
{
  debugger;
  this.http.post('https://localhost:44327/User/Upload/',file)
  .subscribe((res:any)=>{
    if(res)
    console.log(res);
    this.display_Image=res.image;
  },err=>{
    this.toastr.error(err.message , err.status);
  })

}

delete(id:number){
  this.http.delete('https://localhost:44327/User/DeleteUser/'+id).subscribe((res)=>{
    this.toastr.success('Deleted Successfully :) ')
  },err=>{
    this.toastr.error('something error ');
  })

}












}