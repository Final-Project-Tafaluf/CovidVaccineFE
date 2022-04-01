import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeObj:{active_home:string,active_about:string,active_testimonial:string,active_contact:string,active_service:string,active_register:string,active_login:string}={
    active_home:"active",
    active_about:"",
    active_testimonial:"",
    active_contact:"",
    active_service:"",
    active_register:"",
    active_login:"",
  };

  loginFlag : boolean = true;
  dashboardFlag : boolean = false;
  profileFlag : boolean = false;
  signoutFlag : boolean = false;
  contactFlag : boolean = false;
  serviceFlag : boolean = false;


  constructor(private router:Router) { }

  ngOnInit(): void {
  debugger
  this.checkLogin();

  }

checkLogin():void{
  debugger
  var token = localStorage.getItem('token');

  if(token){
  var parseToken = JSON.parse(token)
  let data:any= jwt_decode(parseToken.token);

  if(data.role != null){
    this.loginFlag  = false;
    this.profileFlag  = true;
    this.signoutFlag  = true;
    this.contactFlag  = true;
    this.serviceFlag = true;
    if(data.role == 'admin'){

      this.dashboardFlag  = true;
    }
    else{
      this.dashboardFlag = false
    }
  }
  }




}

  activeNav(value :string){
  debugger
  for (let key in this.activeObj) {
    debugger
    if(key ==value){
      //this.activeObj[key] ="active";
    }else{
      //this.activeObj[key]  ="";
    }
    console.log(this.activeObj)
  }
  }
  logout(){
    this.router.navigate(['security/login'])
    localStorage.clear();
  }
}



function jwt_decode(token: string | null): any {
  throw new Error('Function not implemented.');
}

