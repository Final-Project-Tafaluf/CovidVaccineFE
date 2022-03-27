import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsRestService } from 'src/app/Services/rest/contact-us-rest.service';

@Component({
  selector: 'app-admin-contact-us',
  templateUrl: './admin-contact-us.component.html',
  styleUrls: ['./admin-contact-us.component.scss'],
})
export class AdminContactUsComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public contactUsRestService: ContactUsRestService
  ) {}
  @ViewChild('callDetailsDailog') callDetailsDailog!: TemplateRef<any>;
  @ViewChild('callDeleteDailog') callDeleteDailog!: TemplateRef<any>;
  // contactSubjectSearch:any=new FormControl('',[Validators.required,Validators.email]);
  contactSubjectSearch: any = '';
  detailsInput:any={};
  ngOnInit(): void {
    this.contactUsRestService.getAllContact();
  }

  openDeleteDailog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDailog);
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result != undefined) {
        if (result == 'yes') {
          await this.contactUsRestService.deleteItem(id);
          this.search();
        } else if (result == 'no') console.log('Thank you ');
      }
    });
  }

  openDetailsDailog(contact :any) {
    this.detailsInput=contact;
    const detailsDialogRef = this.dialog.open(this.callDetailsDailog);
  }

  inputValue(ev: any) {
    debugger;
    this.contactSubjectSearch = ev.target.value;
    console.log(ev.target.value);
  }

  search() {
    this.contactUsRestService.getContactsBySubject(this.contactSubjectSearch);
  }
}
