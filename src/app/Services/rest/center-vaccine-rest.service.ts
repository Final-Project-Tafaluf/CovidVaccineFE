import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CenterVaccineRestService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  data: any = {};
  getAll() {
    this.spinner.show();
    this.http
      .get('https:/localhost:44327/api/CenterVaccine/GetallCenterVaccines')
      .subscribe(
        (res) => {
          this.data = res;
          // debugger
          this.spinner.hide();
          // this.toastr.success('Data Retrieved !!');
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.message);
          this.toastr.error(err.status);
        }
      );
  }

  createCenterVaccine(body: any) {
    body.center_Id = Number(body.center_Id);
    body.vaccine_Id = Number(body.vaccine_Id);
    this.spinner.show();
    // debugger;
    this.http
      .post(
        'https:/localhost:44327/api/CenterVaccine/CreateCenterVaccine/',
        body
      )
      .subscribe(
        (res) => {
          // debugger;
          this.spinner.hide();
          if (res == true) {
            this.toastr.success('Saved successfully :)');
            this.getAll();
          } else {
            this.toastr.error('Same data exist');
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error.status, error.message);
        }
      );
  }

  updateCentervaccine(body: any) {
    // debugger
    this.http
      .put(
        'https://localhost:44327/api/CenterVaccine/UpdateCenterVaccine',
        body
      )
      .subscribe(
        (res) => {
          // debugger
          this.toastr.success('updated Successfully');
          this.getAll();
        },
        (err) => {
          this.toastr.error(err.status, err.message);
        }
      );
  }

  deleteItem(id: number) {
    // debugger
    this.http
      .delete('https://localhost:44327/api/CenterVaccine/delete/' + id)
      .subscribe(
        (res) => {
          this.toastr.success('Deleted Successfully :)');
          this.getAll();
        },
        (err) => {
          this.toastr.error(err.status, err.message);
        }
      );
  }

  searchCenterVaccine(data:any)
{
  // debugger
  this.http.get('https://localhost:44327/api/CenterVaccine/SearchCenterVaccine/'+data)
  .subscribe((res)=>{
    this.data=res;
    // debugger
  },err=>{
    this.toastr.error('something error');
  })
}

}
