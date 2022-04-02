import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { DashboardMainRestService } from 'src/app/Services/rest/dashboard-main-rest.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {

  constructor(public dashboardMainRestService:DashboardMainRestService) { }

  ngOnInit(): void {
    this.getAllUsers()
    // var count = data.length;
    // console.log(count);

  }
  async getAllUsers(){
    var usersData =await this.dashboardMainRestService.getAll();}
}
