import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CenterVaccineRestService } from 'src/app/Services/rest/center-vaccine-rest.service';

@Component({
  selector: 'app-manage-center-vaccine',
  templateUrl: './manage-center-vaccine.component.html',
  styleUrls: ['./manage-center-vaccine.component.scss']
})
export class ManageCenterVaccineComponent implements OnInit {
  CreateForm:FormGroup=new FormGroup({
    number_Of_Vaccine: new FormControl(),
    expire_Date:new FormControl(),
    center_Id:new FormControl(),
    vaccine_Id:new FormControl()
  })

  UpdateForm:FormGroup=new FormGroup({
    id: new FormControl(),
    number_Of_Vaccine: new FormControl(),
    expire_Date:new FormControl(),
    center_Id:new FormControl(),
    vaccine_Id:new FormControl()
  })

  health : any ={}
  constructor(public centerVaccineRestService : CenterVaccineRestService) { }

  ngOnInit(): void {
    this.centerVaccineRestService.getAll();
  }

  save(){

  }
  openDeleteDailog(id:number){

  }
  openUpdateDailog(data:any){
this.health = data;
  }
  update(){

  }
}
