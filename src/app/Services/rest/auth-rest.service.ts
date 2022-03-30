import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public spinner :NgxSpinnerService,
    public home :HomeService,public router:Router, private http :HttpClient,private toaster:ToastrService) { }

    submit(email:any, password:any){
      var body ={
        username:email.value.toString(),
        password:password.value.toString()
      }
      const headerDir={
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
      const requestOptions={
        headers:new HttpHeaders(headerDir)
      }
      debugger;
      this.http.post('https://localhost:44327/api/login/',body,requestOptions)
      .subscribe((res:any)=>{
        console.log(res);
       // res=res.toString()
        const responce ={
          token:res.toString()
        }
        localStorage.setItem('token', responce.token);
         let data:any= jwt_decode(responce.token);

         localStorage.setItem('user',JSON.stringify({...data}))
        if(data.role=='admin')
        this.router.navigate(['about'
        ])
        else if (data.role=='client')
        this.router.navigate(['contact'])
      },err=>{
        this.router.navigate(['security/login']);
        this.toaster.error('Somthing error ')
      })
    }


















}
function jwt_decode(token: any): any {
  throw new Error('Function not implemented.');
}

