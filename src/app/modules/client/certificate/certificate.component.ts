import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CertificateRestService } from 'src/app/Services/rest/certificate-rest.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  constructor(private localStorageService:LocalStorageService,public certificateRestService:CertificateRestService) { }
  title = 'angularpdfgenerator';

  makePdf() {
    let pdf = new jsPDF()
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("Certificate.pdf")
      }
    })
  }
  ngOnInit(): void {
    var token = this.localStorageService.getToken();
    var tokenData: any = this.localStorageService.tokenDecode(token);
    var userId : number = tokenData.nameid;
    this.certificateRestService.GetCertificateById(userId);

    
  }

}
