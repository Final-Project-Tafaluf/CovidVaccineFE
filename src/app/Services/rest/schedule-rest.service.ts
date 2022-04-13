import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { returnOrUpdate } from 'ol/extent';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleRestService {
  centersData: any;
  vaccinesData: any;
  RequestsData: any;
  UserScheduleData:any;
  constructor(
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
          this.toaster.success('Data Retrieved !!');
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
  getUserRequest(USER_ID: any): any {
    //show spinner
    this.spinner.show();
    //hits api
    // debugger
    return this.http
      .get(
        'https://localhost:44327/api/UserRequest/GetUserRequestByUserId/' +
          USER_ID
      )
      .toPromise()
      .then(
        (res) => {
          // debugger;
          this.RequestsData = res;
          this.spinner.hide();
          this.toaster.success('Data Retrieved !!');
          return this.RequestsData;
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
  deleteUserRequestById(requestId:number){
    this.http
    .delete('https://localhost:44327/api/UserRequest/DeleteUserRequest/'+requestId)
    .subscribe(
      (res) => {
        if (res != false) {
          this.spinner.hide();
          this.toaster.success('Deleted Successfully');
        } else {
          this.spinner.hide();
          this.toaster.error('Not deleted');
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
    // debugger;
    var token = this.localStorageService.getToken();
    var tokenData: any = this.localStorageService.tokenDecode(token);
    data.User_Id = Number(tokenData.nameid);
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
          debugger;
          this.UserScheduleData = res;
          this.spinner.hide();
          this.toaster.success('Data Retrieved !!');
          return this.UserScheduleData;
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
}
