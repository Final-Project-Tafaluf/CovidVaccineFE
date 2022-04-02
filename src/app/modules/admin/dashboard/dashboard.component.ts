import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }
  toggle:boolean=true;
  
 ngOnInit(): void {
  }
  manageHealthCenter(){
    this.toggle=false;
    this.router.navigate(['admin/manageHealthCenter']);
  }
  logout(){
    this.router.navigate(['security/login'])
    localStorage.clear();  }

    goToUsers(){
      this.toggle=false;
      this.router.navigate(['admin/manageUsers']);
    }

    goToManageHealthCenter(){
      this.toggle=false;
      this.router.navigate(['admin/manageHealthCenter1']);
    }

    goToManageVaccine(){
      this.toggle=false;
      this.router.navigate(['admin/manageVaccine']);
    }
    goToManageAboutUs(){
      this.toggle=false;
      this.router.navigate(['admin/manageAboutUs']);
    }
    goToManageContactUs(){
      this.toggle=false;
      this.router.navigate(['admin/manageContactUs']);
    }
    goToManageHomePage(){
      this.toggle=false;
      this.router.navigate(['admin/manageHomePage']);
    }
    goToUpdateProfile(){
      this.toggle=false;
      this.router.navigate(['admin/UpdateProfile']);
    }
    
}
