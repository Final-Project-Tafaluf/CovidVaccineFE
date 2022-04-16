import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/rest/auth-rest.service';
import { HomeService } from 'src/app/Services/rest/home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router , public auth : AuthService ,public home : HomeService) { }
  ContentToggle:boolean=true;
  ManageUsersToggle:boolean=false;
  ManageHealthCenterToggle:boolean=false;
  ManageVaccineToggle:boolean=false;
  EditAboutUsToggle:boolean=false;
  EditContactUsToggle:boolean=false;
  ManageContactUsToggle:boolean=false;
  EditHomePageToggle:boolean=false;
  ManageScheduleToggle:boolean=false;
  ManageUsersRequests:boolean=false;
  ManageCentersVaccinesToggle:boolean=false;


 ngOnInit(): void {
  this.home.getHome();

  }


    goToMainDashboard(){
    this.ContentToggle=true;
    this.ManageUsersToggle=false;
    this.ManageHealthCenterToggle=false;
    this.ManageVaccineToggle=false;
    this.EditAboutUsToggle=false;
    this.EditContactUsToggle=false;
    this.ManageContactUsToggle=false;
    this.EditHomePageToggle=false;
    this.ManageScheduleToggle=false;
    this.ManageUsersRequests=false;
    this.ManageCentersVaccinesToggle=false;

    }

    goToManageUsers(){
    this.ContentToggle=false;
    this.ManageUsersToggle=true;
    this.ManageHealthCenterToggle=false;
    this.ManageVaccineToggle=false;
    this.EditAboutUsToggle=false;
    this.EditContactUsToggle=false;
    this.ManageContactUsToggle=false;
    this.EditHomePageToggle=false;
    this.ManageScheduleToggle=false;
    this.ManageUsersRequests=false;
    this.ManageCentersVaccinesToggle=false;

    }

    goToManageHealthCenter(){
    this.ContentToggle=false;
    this.ManageUsersToggle=false;
    this.ManageHealthCenterToggle=true;
    this.ManageVaccineToggle=false;
    this.EditAboutUsToggle=false;
    this.EditContactUsToggle=false;
    this.ManageContactUsToggle=false;
    this.EditHomePageToggle=false;
    this.ManageScheduleToggle=false;
    this.ManageUsersRequests=false;
    this.ManageCentersVaccinesToggle=false;

    }

    goToManageCentersVaccines(){
    this.ContentToggle=false;
    this.ManageUsersToggle=false;
    this.ManageHealthCenterToggle=false;
    this.ManageVaccineToggle=false;
    this.EditAboutUsToggle=false;
    this.EditContactUsToggle=false;
    this.ManageContactUsToggle=false;
    this.EditHomePageToggle=false;
    this.ManageScheduleToggle=false;
    this.ManageUsersRequests=false;
    this.ManageCentersVaccinesToggle=true;
    }

    goToManageVaccine(){
      this.ContentToggle=false;
      this.ManageUsersToggle=false;
      this.ManageHealthCenterToggle=false;
      this.ManageVaccineToggle=true;
      this.EditAboutUsToggle=false;
      this.EditContactUsToggle=false;
      this.ManageContactUsToggle=false;
      this.EditHomePageToggle=false;
      this.ManageScheduleToggle=false;
      this.ManageUsersRequests=false;
      this.ManageCentersVaccinesToggle=false;

    }

    goToEditAboutUs(){
      this.ContentToggle=false;
      this.ManageUsersToggle=false;
      this.ManageHealthCenterToggle=false;
      this.ManageVaccineToggle=false;
      this.EditAboutUsToggle=true;
      this.EditContactUsToggle=false;
      this.ManageContactUsToggle=false;
      this.EditHomePageToggle=false;
      this.ManageScheduleToggle=false;
      this.ManageUsersRequests=false;
      this.ManageCentersVaccinesToggle=false;

    }

    goToEditContactUs(){
    this.ContentToggle=false;
    this.ManageUsersToggle=false;
    this.ManageHealthCenterToggle=false;
    this.ManageVaccineToggle=false;
    this.EditAboutUsToggle=false;
    this.EditContactUsToggle=true;
    this.ManageContactUsToggle=false;
    this.EditHomePageToggle=false;
    this.ManageScheduleToggle=false;
    this.ManageUsersRequests=false;
    this.ManageCentersVaccinesToggle=false;

    }

    goToManageContactUs(){
      this.ContentToggle=false;
      this.ManageUsersToggle=false;
      this.ManageHealthCenterToggle=false;
      this.ManageVaccineToggle=false;
      this.EditAboutUsToggle=false;
      this.EditContactUsToggle=false;
      this.ManageContactUsToggle=true;
      this.EditHomePageToggle=false;
      this.ManageScheduleToggle=false;
      this.ManageUsersRequests=false;
      this.ManageCentersVaccinesToggle=false;

    }

    goToEditHomePage(){
      this.ContentToggle=false;
      this.ManageUsersToggle=false;
      this.ManageHealthCenterToggle=false;
      this.ManageVaccineToggle=false;
      this.EditAboutUsToggle=false;
      this.EditContactUsToggle=false;
      this.ManageContactUsToggle=false;
      this.EditHomePageToggle=true;
      this.ManageScheduleToggle=false;
      this.ManageUsersRequests=false;
      this.ManageCentersVaccinesToggle=false;

    }

    goToManageSchedule(){
    this.ContentToggle=false;
    this.ManageUsersToggle=false;
    this.ManageHealthCenterToggle=false;
    this.ManageVaccineToggle=false;
    this.EditAboutUsToggle=false;
    this.EditContactUsToggle=false;
    this.ManageContactUsToggle=false;
    this.EditHomePageToggle=false;
    this.ManageScheduleToggle=true;
    this.ManageUsersRequests=false;
    this.ManageCentersVaccinesToggle=false;

    }

    goToManageUsersRequests(){
      this.ContentToggle=false;
      this.ManageUsersToggle=false;
      this.ManageHealthCenterToggle=false;
      this.ManageVaccineToggle=false;
      this.EditAboutUsToggle=false;
      this.EditContactUsToggle=false;
      this.ManageContactUsToggle=false;
      this.EditHomePageToggle=false;
      this.ManageScheduleToggle=false;
      this.ManageUsersRequests=true;
      this.ManageCentersVaccinesToggle=false;
      }

    signout(){
      this.auth.logout();
    }

}
