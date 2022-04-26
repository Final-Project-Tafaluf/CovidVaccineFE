import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import{HttpClient} from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  logoImage:any;
  homeImage:any;
  aboutImage:any;
  contactImage:any;
  news1Image:any;
  news2Image:any;
  news3Image:any;
  selectedUser:any={};
  data:any=[{}];
  homeElement : any = {};
  ele : any = {};
  userdata:any={};
  cases:any;
  deaths:any;

  constructor(private spinner :NgxSpinnerService, private http:HttpClient, private toastr:ToastrService) { }
  getHome(){
    //show spinner
    //debugger;
    this.spinner.show();
    //hits api
    this.http.get('https://localhost:44327/Home/GetHome/').subscribe((res)=>{
      this.ele=res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved !!')
      // debugger
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
    data.header_Logo = this.logoImage ;
    data.home_Image =this.homeImage;
    data.about_Image=this.aboutImage;
    data.contact_Image=this.contactImage;
    data.news_Imageone=this.news1Image;
    data.news_Imagetwo=this.news2Image;
    data.news_Imagethree=this.news3Image;
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
    body.header_logo = this.logoImage ;
    body.home_Image =this.homeImage;
    body.about_Image=this.aboutImage;
    body.contact_Image=this.contactImage;
    body.news_Imageone=this.news1Image;
    body.news_Imagetwo=this.news2Image;
    body.news_Imagethree=this.news3Image;
    debugger;
    this.http.put('https://localhost:44327/Home/UpdateHome/',body).subscribe((res)=>{
      this.toastr.success('Updated Successfully :) ')
    },err=>{
      this.toastr.error('something error ');
    })
  }



  uploadAttachment(file:FormData)
  {
    this.http.post('https://localhost:44327/Home/UploadLogo/',file)
    .subscribe((res:any)=>{
      if(res)
      console.log(res);
      this.logoImage=res.header_Logo;
      // debugger
    },err=>{
      this.toastr.error(err.message , err.status);
    })

  }
  uploadHome(file2:FormData)
  {
    // debugger;
    this.http.post('https://localhost:44327/Home/UploadImage/',file2)
    .subscribe((res:any)=>{
      console.log(res);

      this.homeImage=res.home_Image;
      // debugger
    },err=>{
      this.toastr.error(err.message , err.status);
    })

  }
  uploadAbout(file:FormData)
  {
    // debugger;
    this.http.post('https://localhost:44327/Home/UploadAbout/',file)
    .subscribe((res:any)=>{
      this.aboutImage= res.about_Image;
    },err=>{
      this.toastr.error(err.message , err.status);
    })

  }
  uploadContact(file:FormData)
  {
    // debugger;
    this.http.post('https://localhost:44327/Home/UploadContact/',file)
    .subscribe((res:any)=>{
      this.contactImage=res.contact_Image;

    },err=>{
      this.toastr.error(err.message , err.status);
    })

  }
  upload1(file:FormData)
  {
    // debugger;
    this.http.post('https://localhost:44327/Home/Upload1/',file)
    .subscribe((res:any)=>{
      this.news1Image= res.news_Imageone;
    },err=>{
      this.toastr.error(err.message , err.status);
    })

  }
  upload2(file:FormData)
  {
    // debugger;
    this.http.post('https://localhost:44327/Home/Upload2/',file)
    .subscribe((res:any)=>{
      this.news2Image= res.news_Imagetwo;
    },err=>{
      this.toastr.error(err.message , err.status);
    })

  }
  upload3(file:FormData)
  {
    // debugger;
    this.http.post('https://localhost:44327/Home/Upload3/',file)
    .subscribe((res:any)=>{
      this.news3Image= res.news_Imagethree;
    },err=>{
      this.toastr.error(err.message , err.status);
    })

  }

  lastMonthCases(){
    // this.spinner.show();
    // debugger;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    var lastDay = new Date();
    lastDay.setHours(3,0,0,0);
    lastDay.toISOString();
    var country = 'jordan';
    this.http.get(`https://api.covid19api.com/country/${country}/status/confirmed?from=${firstDay}&to=${lastDay}`).subscribe((res)=>{
      this.cases=res;
      // debugger
      // this.spinner.hide();
    }, err=>{
      // this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })

  }

  lastMonthDeaths(){
    // this.spinner.show();
    // debugger;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    var lastDay = new Date();
    lastDay.setHours(3,0,0,0);
    lastDay.toISOString();
    var country = 'jordan';
    this.http.get(`https://api.covid19api.com/country/${country}/status/deaths?from=${firstDay}&to=${lastDay}`).subscribe((res)=>{
      this.deaths=res;
      // debugger
      // this.spinner.hide();
    }, err=>{
      // this.spinner.hide();
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    })

  }




}
