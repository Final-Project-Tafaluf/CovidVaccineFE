import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import{HttpClient} from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  logo_Image:any;
  home_Image:any;
  about_Image:any;
  contact_Image:any;
  news1_Image:any;
  news2_Image:any;
  news3_Image:any;
  selectedUser:any={};
  data:any=[{}]

  ele : any = {}

  userdata:any={}
  constructor(private spinner :NgxSpinnerService, private http:HttpClient, private toastr:ToastrService) { }
  getHome(){
    //show spinner
    this.spinner.show();
    //hits api
    this.http.get('https://localhost:44327/Home/GetHome/').subscribe((res)=>{
      this.ele=res;
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
  createHome(data:any){
    this.spinner.show();
    // debugger;
    data.header_Logo = this.logo_Image ;
    data.home_Image =this.home_Image;
    data.contact_Image=this.about_Image;
    data.about_Image=this.contact_Image;
    data.news_Imageone=this.news1_Image;
    data.news_Imagetwo=this.news2_Image;
    data.news_Imagethree=this.news3_Image;
    this.http.post('https://localhost:44327/Home/CreateHome/',data).subscribe((res)=>
    {
    if(res != "false")
    {
      this.spinner.hide();
      this.toastr.success('Saved Successfully')
    }
    else{
      this.spinner.hide();
      this.toastr.error('Something Error');
    }
    }, err=>{
      console.log('faild');
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }
  updateHome(body:any){
    body.header_Logo = this.logo_Image ;
    body.home_Image =this.home_Image;
    body.contact_Image=this.about_Image;
    body.about_Image=this.contact_Image;
    body.news_Imageone=this.news1_Image;
    body.news_Imagetwo=this.news2_Image;
    body.news_Imagethree=this.news3_Image;
    debugger;
    this.http.put('https://localhost:44327/Home/UpdateHome/',body).subscribe((res)=>{
      this.toastr.success('Updated Successfully :) ')
    },err=>{
      this.toastr.error('something error ');
    })
  }



  uploadAttachment(file:FormData)
  {
    debugger;
    this.http.post('https://localhost:44327/Home/Upload/',file)
    .subscribe((res:any)=>{
      if(res)
      console.log(res);
      this.logo_Image=res.header_Logo;
      this.home_Image=res.home_Image;
      this.about_Image=res.contact_Image;
      this.contact_Image=res.about_Image;
      this.news1_Image=res.news_Imageone;
      this.news2_Image=res.news_Imagetwo;
      this.news3_Image=res.news_Imagethree;
    },err=>{
      this.toastr.error(err.message , err.status);
    })

  }








}
