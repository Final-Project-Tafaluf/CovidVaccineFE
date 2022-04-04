import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageVaccineRestService } from 'src/app/Services/rest/manage-vaccine-rest.service';

@Component({
  selector: 'app-create-vaccine',
  templateUrl: './create-vaccine.component.html',
  styleUrls: ['./create-vaccine.component.scss']
})
export class CreateVaccineComponent implements OnInit {
  CreateForm:FormGroup=new FormGroup({
    vaccine_Type: new FormControl('',Validators.required)
  })
  constructor(public manageVaccineRestService:ManageVaccineRestService) { }

  ngOnInit(): void {
  }
  save(){
    this.manageVaccineRestService.createVccine(this.CreateForm.value);
    /* window.location.reload(); */
  }
}
