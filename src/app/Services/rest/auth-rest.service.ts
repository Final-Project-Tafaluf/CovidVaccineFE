import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './home.service';
import jwt_decode from "jwt-decode";


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
      this.http.post('https://localhost:44327/api/JWT/login/',body,requestOptions)
      .subscribe((res:any)=>{
        debugger
        console.log(res);
        var response=res.toString()
        localStorage.setItem('token', response);
        let data:any= jwt_decode(response);

        localStorage.setItem('user',JSON.stringify({...data}))
        if(data.role=='admin')
        window.location.href = "";
        else if (data.role=='client')
        this.router.navigate(['contact'])
      },err=>{
        debugger
        this.router.navigate(['security/login']);
        this.toaster.error('Somthing error ')
      })
    }


}

