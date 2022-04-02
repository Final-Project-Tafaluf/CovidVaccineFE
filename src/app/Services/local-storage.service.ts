import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  setToken(response :any){
    localStorage.setItem('token', response);
    let data:any= jwt_decode(response);
    localStorage.setItem('user',JSON.stringify({...data}))
    return data;
  }
  getToken(){
    return localStorage.getItem('token');
  }
  tokenDecode(token:any){
    return jwt_decode(token)
  }
}


