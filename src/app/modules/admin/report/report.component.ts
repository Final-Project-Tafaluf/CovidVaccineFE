import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportRestService } from 'src/app/Services/rest/report-rest.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  constructor(public reportRestService:ReportRestService ,private localStorageService:LocalStorageService) { }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF("landscape");
      var width = PDF.internal.pageSize.getWidth();
      var height = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, width, height);
      PDF.save('angular-demo.pdf');
    });
  }
  ngOnInit(): void {
    var token = this.localStorageService.getToken();
    var tokenData: any = this.localStorageService.tokenDecode(token);
    var userId : number = tokenData.nameid;
    this.reportRestService.getNumberUser();
    this.reportRestService.getNumberUsersrequestes();
    this.reportRestService.getNumberVaccinatedPatient();
    this.reportRestService.getNumberHealthCentert();
  }

}
