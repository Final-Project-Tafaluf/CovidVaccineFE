import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from 'src/app/Services/helpers.service';
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
  userSchedules:any;
  newDate:Date = new Date();
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  constructor(private dialog:MatDialog, public scheduleRestService: ScheduleRestService,private localStorageService: LocalStorageService,public helpersService: HelpersService) { }

  ngOnInit(): void {
    this.getUserDataFromLocal();
    this.getUserRequests();
    this.getUserSchedules();
  }
  getUserDataFromLocal(){
    var token = this.localStorageService.getToken();
    if (token) {
      // debugger;
      this.userData = this.localStorageService.tokenDecode(token);
    }
  }

  async getUserRequests(){
    // debugger;
      this.userRequests = await this.scheduleRestService.getUserRequest(this.userData.nameid);
  }

  async getUserSchedules(){
    debugger;
    this.userSchedules = await this.scheduleRestService.getScheduleByUserId(this.userData.nameid);
    debugger;
    console.log("this.userSchedules",this.userSchedules);
  }

  checkStatus(status:any,toDate:any){
    debugger;
    if(new Date() >new Date(toDate) && status != 'Taken' ){
      status = 'Absent';
    }
    return status;
  }

  saveCertificate(){

  }

  showDetails(){
    
  }

  openDeleteDialog(id:any){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes"){
        this.removeRequest(id);
      }
        else if(res=="no")
        console.log("Thank you ");
      }
    })
  }

  removeRequest(requestId: number){
    debugger;
    this.scheduleRestService.deleteUserRequestById(requestId);
    this.getUserRequests(); // To refresh the table
  }
}
