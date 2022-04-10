import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CertificateRestService } from 'src/app/Services/rest/certificate-rest.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  constructor(private localStorageService:LocalStorageService,public certificateRestService:CertificateRestService) { }

  ngOnInit(): void {
    var token = this.localStorageService.getToken();
    var tokenData: any = this.localStorageService.tokenDecode(token);
    var userId : number = tokenData.nameid;
    this.certificateRestService.GetCertificateById(userId);

    
  }

}
