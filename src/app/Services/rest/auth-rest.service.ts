import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './home.service';
import jwt_decode from "jwt-decode";
import { LocalStorageService } from '../local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public spinner :NgxSpinnerService,
    public home :HomeService,public router:Router, private http :HttpClient,private toaster:ToastrService
    ,private localStorageService:LocalStorageService) { }

    submit(data:any){
      var body ={
        username:data.user_identifier,
        password:data.password
      }
      const headerDir={
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
      const requestOptions={
        headers:new HttpHeaders(headerDir)
      }
      // debugger;
      this.http.post('https://localhost:44327/api/JWT/login/',body,requestOptions)
      .subscribe((response:any)=>{
        // debugger
        console.log(response);
        let data:any = this.localStorageService.setToken(response);
        if(data.role=='admin')
        window.location.href = "admin/dashboard";
        else if (data.role=='client')
        this.router.navigate([""])
      },err=>{
        // debugger
        this.router.navigate(['security/login']);
        this.toaster.error('Worng Username or Password')
      })
    }
    logout() {
      window.location.href = "security/login";

      //this.router.navigate(['security/login']);
      localStorage.clear();
    }

}

