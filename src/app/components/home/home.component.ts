import { Component, OnInit } from '@angular/core';
import { ContactUsRestService } from 'src/app/Services/rest/contact-us-rest.service';
import { HomeService } from 'src/app/Services/rest/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public contactUsRestService:ContactUsRestService,public home : HomeService) { }

  ngOnInit(): void {
    this.contactUsRestService.getAllContactbytestimonial();
    this.home.getHome();
  }


}
