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

  constructor(private router:Router) { }

  ngOnInit(): void {

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



