import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserProfileRestService {
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  data: any = [{}];
  selectedUser: any = {};
  display_Image:any;

  getUserProfileInfoByID(id: number) {
    this.spinner.show();
    // debugger;
    this.http.get('https://localhost:44327/User/GetUserById/' + id).subscribe(
      (res) => {
        this.selectedUser = res;
        //debugger
        this.spinner.hide();
        this.toastr.success('Data Retieved !!');
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.message);
        this.toastr.error(err.status);
      }
    );
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


  getbyName(name:any){
    //show spinner
    this.spinner.show();
    //hits api
    // debugger;
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




createUser(data:any){
  this.spinner.show();
  debugger;
  data.image=this.display_Image;
  data.role_Id = 2;
  this.http.post('https://localhost:44327/User/CreateUser/',data).subscribe((res)=>
  {

    console.log(res);
    if(res == "created"){

      this.spinner.hide();
      this.toastr.success('Saved Successfully')
    }
    else if(res == "valid")
    {
      this.spinner.hide();
      this.toastr.error('Please Enter Valid SSN');
    }
    else if(res == "email")
    {
      this.spinner.hide();
      this.toastr.error('this email already used');
    }
    else if(res == "username")
    {
      this.spinner.hide();
      this.toastr.error('this Username already used');
    }
    else if(res =="ssn")
    {
      this.spinner.hide();
      this.toastr.error('ssn already used');
    }
    else{
      this.spinner.hide();
      this.toastr.error('Smoething Error !');
    }

  }, err=>
    {
      console.log('faild');
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    }
    )}

  // if(res != "false")
  // {
  //   this.spinner.hide();
  //   this.toastr.success('Saved Successfully')
  // }
  // else
  // {
  //   this.spinner.hide();
  //   this.toastr.error('Please Enter Valid SSN/Email/Username');
  // }}, err=>{
  //   console.log('faild');
  //   this.spinner.hide();
  //   this.toastr.error(err.message , err.status)
  // })
//}
updateUser(body:any){
  body.image=this.display_Image;
  debugger;
  this.http.put('https://localhost:44327/User/UpdateUser/',body).subscribe((res)=>{
    this.toastr.success('Updated Successfully :) ')
  },err=>{
    this.toastr.error('something error ');
  })
}

uploadAttachment(file:FormData)
{
  // debugger;
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
