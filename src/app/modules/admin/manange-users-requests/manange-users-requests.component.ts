import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from 'src/app/Services/helpers.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ScheduleRestService } from 'src/app/Services/rest/schedule-rest.service';

@Component({
  selector: 'app-manange-users-requests',
  templateUrl: './manange-users-requests.component.html',
  styleUrls: ['./manange-users-requests.component.scss']
})
export class ManangeUsersRequestsComponent implements OnInit {
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  @ViewChild('callAddScheduleDialog') callAddScheduleDialog! :TemplateRef<any>
  usersRequests:any;
  constructor(private dialog:MatDialog, public scheduleRestService: ScheduleRestService,private localStorageService: LocalStorageService,public helpersService: HelpersService) { }

  ngOnInit(): void {
    this.getAllUsersRequests();
  }
  async getAllUsersRequests(){
    // debugger;
      this.usersRequests = await this.scheduleRestService.getUserAllUsersRequests();
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

  OpenAddScheduleDialog(id:any){
    const dialogRef=this.dialog.open(this.callAddScheduleDialog);
  }
  removeRequest(requestId: number){
    debugger;
    this.scheduleRestService.deleteUserRequestById(requestId);
    this.getAllUsersRequests(); // To refresh the table
  }
}
