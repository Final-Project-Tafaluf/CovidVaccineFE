import { Component, OnInit } from '@angular/core';
import { ContactUsRestService } from 'src/app/Services/rest/contact-us-rest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/Services/rest/home.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  CreateForm:FormGroup=new FormGroup({
    name: new FormControl("",[Validators.required]),
    subject: new FormControl("",[Validators.required]),
    MSG: new FormControl("",[Validators.required]),
    phone_Number:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required,Validators.email]),
    testimonial:new FormControl(0)
  })
  constructor(public contactUsRestService:ContactUsRestService , public home :HomeService) { }

  ngOnInit(): void {
    this.home.getHome();

  }
  send(){
    // debugger
    this.contactUsRestService.createContact(this.CreateForm.value);

  }
}
