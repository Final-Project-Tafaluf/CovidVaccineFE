import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserProfileRestService {
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  data: any = [{}];
  selectedUser: any = {};

  getUserProfileInfoByID(id: number) {
    //show spinner
    this.spinner.show();
    //hits api
    // debugger;
    this.http.get('https://localhost:44327/User/GetUserById/' + id).subscribe(
      (res) => {
        this.selectedUser = res;
        // debugger
        this.spinner.hide();
        this.toastr.success('Data Retieved !!');
      },
      (err) => {
        //hide spinner
        this.spinner.hide();
        //Toastr
        this.toastr.error(err.message);
        this.toastr.error(err.status);
      }
    );
  }

  updateUserProfile(body: any) {
    // debugger

    this.http.put('https://localhost:44327/User/UpdateUser/', body).subscribe(
      (res) => {
        // debugger
        this.toastr.success('updated Successfully :)');
        window.location.reload();
      },
      (err) => {
        this.toastr.error(err.status, err.message);
      }
    );
  }
}
