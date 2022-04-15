import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { CenterVaccineRestService } from 'src/app/Services/rest/center-vaccine-rest.service';
import { DashboardMainRestService } from 'src/app/Services/rest/dashboard-main-rest.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {

  constructor(public dashboardMainRestService:DashboardMainRestService,
    public centerVaccineRestService : CenterVaccineRestService) { }

  ngOnInit(): void {
    this.dashboardMainRestService.numberOfUser();
    this.dashboardMainRestService.numberOfVaccien();
    this.dashboardMainRestService.numberOfCenter();
    this.dashboardMainRestService.numberOfMessage();
    this.dashboardMainRestService.numberOfFizer();
    this.dashboardMainRestService.numberOfSinopharm();
this.centerVaccineRestService.getAll();
  }
}
