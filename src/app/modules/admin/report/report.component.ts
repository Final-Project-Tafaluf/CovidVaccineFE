import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ReportRestService } from 'src/app/Services/rest/report-rest.service';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('Excel') Excel!: ElementRef; 
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

  //EXCEL
  title = 'Excel';  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.Excel.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  }  

  ngOnInit(): void {
    this.reportRestService.getNumberUser();
    this.reportRestService.getNumberUsersrequestes();
    this.reportRestService.getNumberVaccinatedPatient();
    this.reportRestService.getNumberHealthCentert();
  }

}
