import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsRestService } from 'src/app/Services/rest/contact-us-rest.service';

@Component({
  selector: 'app-manage-contact-us',
  templateUrl: './manage-contact-us.component.html',
  styleUrls: ['./manage-contact-us.component.scss']
})
export class ManageContactUsComponent implements OnInit {
  @ViewChild('callTestimonialDailog') callTestimonialDailog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDailog! :TemplateRef<any>
  @ViewChild('callDetailsDailog')callDetailsDailog! :TemplateRef<any>
  constructor(private dialog:MatDialog, public contactUsRestService:ContactUsRestService ) { }

  center:any={};

  TestimonialForm:FormGroup=new FormGroup({
    id: new FormControl(),
    testimonial:new FormControl()
})
  ngOnInit(): void {
    this.contactUsRestService.getAllContact();
  }

  openDetailsDailog(MSG1:any,Email1:any){
    // debugger
    this.center={
      msg:MSG1,
      email:Email1
    }
    this.dialog.open(this.callDetailsDailog);
  }
  Detail:FormGroup=new FormGroup({
    msg:new FormControl(),
    email:new FormControl()
  })

  openTestimonialDailog(iDD:any,testimonial1:any){
    this.center={
      id:iDD,
      testimonial:testimonial1
    }
  this.dialog.open(this.callTestimonialDailog);
}

  yes(){
    this.contactUsRestService.updatebytestimonial(this.TestimonialForm.value);
  }

  openDeleteDailog(id:number)
  {
    const dialogRef=this.dialog.open(this.callDeleteDailog);
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined)
      {
        if(result=='yes')
        this.contactUsRestService.deleteItem(id);
        else if(result=='no'){
          console.log("Thank you ");
          this.dialog.closeAll();
        }
      }
    })
  }

}
