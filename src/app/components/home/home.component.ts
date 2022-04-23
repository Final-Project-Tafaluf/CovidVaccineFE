import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactUsRestService } from 'src/app/Services/rest/contact-us-rest.service';
import { DashboardMainRestService } from 'src/app/Services/rest/dashboard-main-rest.service';
import { HomeService } from 'src/app/Services/rest/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private spinner :NgxSpinnerService,public contactUsRestService:ContactUsRestService,public home : HomeService,public dashboardMainRestService:DashboardMainRestService) { }

  ngOnInit(): void {
    this.contactUsRestService.getAllContactbytestimonial();
    this.home.getHome();
    this.home.lastMonthCases();
    this.home.lastMonthDeaths();
    this.dashboardMainRestService.getReport();
  }


}
