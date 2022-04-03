import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ScheduleRestService } from 'src/app/Services/rest/schedule-rest.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  userRequests:any;
  userData:any;
  constructor(public scheduleRestService: ScheduleRestService,private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUserRequests()
  }
  async getUserRequests(){
    var token = this.localStorageService.getToken();
    if (token) {
      debugger;
      this.userData = this.localStorageService.tokenDecode(token);
      this.userRequests = await this.scheduleRestService.getUserRequest(this.userData.nameid);
    }
  }
  removeRequest(){

  }
}
