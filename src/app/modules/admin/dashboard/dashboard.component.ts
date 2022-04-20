import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangService } from 'src/app/Services/language/lang.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { AuthService } from 'src/app/Services/rest/auth-rest.service';
import { HomeService } from 'src/app/Services/rest/home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService,
    public home: HomeService,
    private localStorageService: LocalStorageService,
    private langService: LangService
  ) {}
  ContentToggle: boolean = true;
  ManageUsersToggle: boolean = false;
  ManageHealthCenterToggle: boolean = false;
  ManageVaccineToggle: boolean = false;
  EditAboutUsToggle: boolean = false;
  EditContactUsToggle: boolean = false;
  ManageContactUsToggle: boolean = false;
  EditHomePageToggle: boolean = false;
  ManageScheduleToggle: boolean = false;
  ManageUsersRequests: boolean = false;
  ManageCentersVaccinesToggle: boolean = false;
  langBoolean = false;

  ngOnInit(): void {
    this.home.getHome();
    this.initiatLangBtn();
  }

  goToMainDashboard() {
    this.ContentToggle = true;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToManageUsers() {
    this.ContentToggle = false;
    this.ManageUsersToggle = true;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToManageHealthCenter() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = true;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToManageCentersVaccines() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = true;
  }

  goToManageVaccine() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = true;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToEditAboutUs() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = true;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToEditContactUs() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = true;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToManageContactUs() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = true;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToEditHomePage() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = true;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToManageSchedule() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = true;
    this.ManageUsersRequests = false;
    this.ManageCentersVaccinesToggle = false;
  }

  goToManageUsersRequests() {
    this.ContentToggle = false;
    this.ManageUsersToggle = false;
    this.ManageHealthCenterToggle = false;
    this.ManageVaccineToggle = false;
    this.EditAboutUsToggle = false;
    this.EditContactUsToggle = false;
    this.ManageContactUsToggle = false;
    this.EditHomePageToggle = false;
    this.ManageScheduleToggle = false;
    this.ManageUsersRequests = true;
    this.ManageCentersVaccinesToggle = false;
  }

  signout() {
    this.auth.logout();
  }

  initiatLangBtn() {
    var lang = this.localStorageService.getLanguage();
    if (lang && lang == 'en') {
      this.langBoolean = true;
    } else {
      this.langBoolean = false;
    }
  }

  changeLanguage(event: any) {
    console.log('event', event.target.checked);
    if (event.target.checked == true) {
      this.localStorageService.langToEn();
    } else {
      this.localStorageService.langToAr();
    }
    window.location.reload();
  }

  burgerToggelCode() {
    debugger;
    // var vw = $(window)[0].innerWidth;
    // if (vw > 991) {
      $('.pcoded-navbar:not(.theme-horizontal)').toggleClass(
        'navbar-collapsed'
      );
      $('.pcoded-main-container').toggleClass('pcoded-main-container_mod');
    // }
  }
}
