import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CertificateRestService } from 'src/app/Services/rest/certificate-rest.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  // @ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('htmlData') htmlData!: ElementRef;
  constructor(private localStorageService:LocalStorageService,public certificateRestService:CertificateRestService) { }
  // title = 'angularpdfgenerator';

  // makePdf() {
  //   let pdf = new jsPDF()
  //   pdf.html(this.el.nativeElement, {
  //     callback: (pdf) => {
  //       pdf.save("Certificate.pdf")
  //     }
  //   })
  // }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    debugger
    html2canvas(DATA).then((canvas) => {
      /* let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width; */
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
    this.certificateRestService.GetCertificateById(userId);

    
  }

}
