import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { returnOrUpdate } from 'ol/extent';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleRestService {
  centersData: any= [];
  vaccinesData: any = [];
  allRequestsData: any;
  requestsData: any;
  userScheduleData: any;
  routeCoordinatesArray: any;

  checkLastUserTakenDoseString:any;
  allSchedulesData :any ={};


  data :any ={};

  constructor(
    private dialog:MatDialog,
    public spinner: NgxSpinnerService,
    public router: Router,
    private http: HttpClient,
    private toaster: ToastrService,
    private localStorageService: LocalStorageService
  ) {}
  getAllCenters(): any {
    //show spinner
    this.spinner.show();
    //hits apidebugger

    return this.http
      .get('https://localhost:44327/api/healthcentervac/GetallHealthCenters')
      .toPromise()
      .then(
        (res) => {
          // debugger
          this.centersData = res;
          this.spinner.hide();
          // this.toaster.success('Data Retrieved !!');
          return this.centersData;
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toaster.error(err.message);
          this.toaster.error(err.status);
          return err.message;
        }
      );
  }

  getAllCentersDashboard(): any {
    //show spinner
    // this.spinner.show();
    //hits apidebugger

    return this.http
      .get('https://localhost:44327/api/healthcentervac/GetallHealthCenters')
      .toPromise()
      .then(
        (res) => {
          // debugger
          this.centersData = res;
          // this.spinner.hide();
          // this.toaster.success('Data Retrieved !!');
          return this.centersData;
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toaster.error(err.message);
          this.toaster.error(err.status);
          return err.message;
        }
      );
  }
  getAllVaccines(): any {
    //show spinner
    this.spinner.show();
    //hits apidebugger
    // debugger
    return this.http
      .get('https://localhost:44327/api/vaccine/GetallVaccines')
      .toPromise()
      .then(
        (res) => {
          // debugger
          this.vaccinesData = res;
          this.spinner.hide();
          this.toaster.success('Data Retrieved !!');
          return this.vaccinesData;
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toaster.error(err.message);
          this.toaster.error(err.status);
          return err.message;
        }
      );
  }

  getVaccinesByCenterId(centerId: number): any {
    //show spinner
    this.spinner.show();
    //hits apidebugger
    debugger;
    return this.http
      .get(
        'https://localhost:44327/api/CenterVaccine/GetVaccinesByCenterId/' +
          centerId
      )
      .toPromise()
      .then(
        (res :any) => {
          debugger;
          this.spinner.hide();
          // this.toaster.success('Data Retrieved !!');
          if(res.length>0){
          this.vaccinesData = res;
          return this.vaccinesData;
        }else{
          this.vaccinesData = [];
          return this.vaccinesData;
        }
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toaster.error(err.message);
          this.toaster.error(err.status);
          return err.message;
        }
      );
  }

  getUserAllUsersRequests(): any {
    //show spinner
    this.spinner.show();
    //hits api
    // debugger
    return this.http
      .get('https://localhost:44327/api/UserRequest/GetallUserRequests/')
      .toPromise()
      .then(
        (res) => {
          // debugger;
          this.allRequestsData = res;
          this.spinner.hide();
          // this.toaster.success('Data Retrieved !!');
          return this.allRequestsData;
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toaster.error(err.message);
          this.toaster.error(err.status);
          return err.message;
        }
      );
  }

  getUserRequestById(USER_ID: any): any {
    //show spinner
    this.spinner.show();
    //hits api
    debugger
    return this.http
      .get(
        'https://localhost:44327/api/UserRequest/GetUserRequestByUserId/' +
          USER_ID
      )
      .toPromise()
      .then(
        (res) => {
          debugger;
          this.requestsData = res;
          this.spinner.hide();
          // this.toaster.success('Data Retrieved !!');
          return this.requestsData;
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toaster.error(err.message);
          this.toaster.error(err.status);
          return err.message;
        }
      );
  }
  deleteUserRequestById(requestId: number) {
    // debugger
    return this.http
      .delete(
        'https://localhost:44327/api/UserRequest/DeleteUserRequest/' + requestId
      )
      .toPromise()
      .then(
        (res) => {
          // debugger
          if (res) {
            this.allRequestsData = res;
            this.spinner.hide();
            this.toaster.success('Data Retrieved !!');
            return this.allRequestsData;
          }
        },
        (err) => {
          console.log('faild');
          this.spinner.hide();
          this.toaster.error(err.message, err.status);
        }
      );
  }

  deleteUserRequestByUserId(user_id: number) {
    // debugger
    return this.http
      .delete(
        'https://localhost:44327/api/UserRequest/DeleteUserRequestByUserId/' + user_id
      )
      .toPromise()
      .then(
        (res) => {
          // debugger
          if (res) {
            this.allRequestsData = res;
            this.spinner.hide();
            this.toaster.success('Data Retrieved !!');
            return this.allRequestsData;
          }
        },
        (err) => {
          console.log('faild');
          this.spinner.hide();
          this.toaster.error(err.message, err.status);
        }
      );
  }

  sendRequest(data: any) {
    this.spinner.show();
    //debugger;
    var token = this.localStorageService.getToken();
    var tokenData: any = this.localStorageService.tokenDecode(token);
    data.User_Id = Number(tokenData.nameid);
    data.center_id = Number(data.center_id);
    data.vaccine_id = Number(data.vaccine_id);
    this.http
      .post('https://localhost:44327/api/UserRequest/CreateUserRequest/', data)
      .subscribe(
        (res) => {
          if (res != false) {
            this.spinner.hide();
            this.toaster.success('Saved Successfully');
          } else {
            this.spinner.hide();
            this.toaster.error('You had an active request');
          }
        },
        (err) => {
          console.log('faild');
          this.spinner.hide();
          this.toaster.error(err.message, err.status);
        }
      );
  }

  getScheduleByUserId(USER_ID: any): any {
    //show spinner
    this.spinner.show();
    //hits apidebugger
    return this.http
      .get(
        'https://localhost:44327/api/Schedual/GetUserSchedualByUserId/' +
          USER_ID
      )
      .toPromise()
      .then(
        (res) => {
          // debugger;
          this.userScheduleData = res;
          this.spinner.hide();
          // this.toaster.success('Data Retrieved !!');
          return this.userScheduleData;
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toaster.error(err.message);
          this.toaster.error(err.status);
          return err.message;
        }
      );
  }

  checkLastUserTakenDose(USER_ID: any): any {
    //show spinner
    this.spinner.show();
    //hits apidebugger
    // debugger;
    const headerDir={
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }
    return this.http
      .get(
        'https://localhost:44327/api/Schedual/CheckLastUserTakenDose/' +
          USER_ID,requestOptions
      )
      .toPromise()
      .then(
        (res) => {
          // debugger;
          this.checkLastUserTakenDoseString = res;
          this.spinner.hide();
          this.toaster.success('Data Retrieved !!');
          return this.checkLastUserTakenDoseString;
        },
        (err) => {
          //hide spinner
          this.spinner.hide();
          //Toastr
          this.toaster.error(err.message);
          this.toaster.error(err.status);
          return err.message;
        }
      );
  }

  getAllSchedules(){
    this.spinner.show();
    this.http.get('https:/localhost:44327/api/Schedual/GetallScheduals').subscribe((res)=>{
      this.allSchedulesData=res;
      // debugger
      this.spinner.hide();
      // this.toaster.success('Data Retrieved !!')
    }, err=>{
      this.spinner.hide();
      this.toaster.error(err.message);
      this.toaster.error(err.status);
    })
  }
  createSchedule(data: any,flag:any) {
    this.spinner.show();
    // debugger;
    data.center_id = Number(data.center_id);
    data.vaccine_id = Number(data.vaccine_id);
    this.http
      .post('https://localhost:44327/api/Schedual/CreateSchedual/', data)
      .subscribe(
        async(res) => {
          if (res != false) {
            this.spinner.hide();
            this.toaster.success('Saved Successfully');
            this.dialog.closeAll();
            if(flag == true){
            await this.deleteUserRequestByUserId(data.user_Id);
          }else{
            await this.getAllSchedules();
          }
          } else {
            this.spinner.hide();
            this.toaster.error('User had an active schedule');
          }
        },
        (err) => {
          console.log('faild');
          this.spinner.hide();
          this.toaster.error(err.message, err.status);
        }
      );
  }
  async getRouteCoordinates(fromArr: any, editArr: any) {
    // this.spinner.show();
    //debugger;

    return await $.get(
      `https://us1.locationiq.com/v1/directions/driving/${fromArr[1]},${fromArr[0]};${editArr[0]},${editArr[1]}?key=pk.8ed022a2e40a8df617a811d51b16d089&geometries=geojson&overview=full`,
      function (data, status) {
        //debugger;
        return data.routes[0].geometry.coordinates;
      }
    );
  }
    SearchUserRequest(data:any,dateFrom:any,dateTo:any){
      //show spinner
      this.spinner.show();
      //hits api
      // debugger;
      this.http.get('https://localhost:44327/api/UserRequest/SearchUserRequest/'+data+'/'+dateFrom+'/'+dateTo).subscribe((res)=>{
        this.data=res;
        // debugger
  
        this.spinner.hide();
        this.toaster.success('Data Retieved !!')
      }, err=>{
        //hide spinner
        this.spinner.hide();
         //Toastr
        this.toaster.error(err.message);
        this.toaster.error(err.status);
      })
  }
}
