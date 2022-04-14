import { Component, OnInit } from '@angular/core';
import { ReportRestService } from 'src/app/Services/rest/report-rest.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(public reportRestService:ReportRestService) { }

  ngOnInit(): void {
    this.reportRestService.getNumberUser();
    this.reportRestService.getNumberUsersrequestes();
    this.reportRestService.getNumberVaccinatedPatient();
    this.reportRestService.getNumberHealthCentert();
  }

}
