import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from 'src/app/Services/helpers.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ScheduleRestService } from 'src/app/Services/rest/schedule-rest.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UserProfileRestService } from 'src/app/Services/rest/user-profile-rest.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  userRequests:any;
  userData:any;
  userSchedules:any;
  selectedUser:any = {
    "id": 0,
    "first_Name": "",
    "last_Name": "",
    "gender": "",
    "birthdate": "",
    "address": "",
    "phone": "",
    "image": "",
    "email": "",
    "password": "",
    "username": "",
    "ssn": "",
    "dose_Number": 0,
    "role_Id": 0,
    "user_Id": 0
};
  certificateDoseTakenDate:any;
  certificateDose:any;
  certificateCenterName:any;
  certificateVaccineType:any;
  certificateDoctorName:any;
  newDate:Date = new Date();
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  @ViewChild('callCertificateDialog') callCertificateDialog! :TemplateRef<any>
  constructor(private dialog:MatDialog, public scheduleRestService: ScheduleRestService,private localStorageService: LocalStorageService,public helpersService: HelpersService, public userProfileRestService:UserProfileRestService) { }

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
      this.userRequests = await this.scheduleRestService.getUserRequestById(this.userData.nameid);
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

  async installCertificate(date:any,dose:any,center_name:any,vaccine_type:any, doctor_name:any){
    this.certificateDoseTakenDate=date;
    this.certificateDose=dose;
    this.certificateCenterName=center_name;
    this.certificateVaccineType=vaccine_type;
    this.certificateDoctorName=doctor_name;

    debugger;
    this.selectedUser= await this.userProfileRestService.getUserForScheduleByID(this.userData.nameid);
    console.log(this.userProfileRestService.selectedUser)
    const dialogRef=this.dialog.open(this.callCertificateDialog);
    // this.openPDF();
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

   public async savePDF(): Promise<void> {
    let DATA: any = document.getElementById('htmlData');
    setTimeout(() => {
      html2canvas(DATA).then((canvas) => {
        /* let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width; */
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF("landscape");
        var width = PDF.internal.pageSize.getWidth();
        var height = PDF.internal.pageSize.getHeight();
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, width, height);
        PDF.save('angular-demo.pdf');
      });
    }, 500);
   
  }
}
