import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    id: new FormControl("",[Validators.required]),
    testimonial:new FormControl("",[Validators.required]),
    subject:new FormControl("",[Validators.required]),
    msg:new FormControl("",[Validators.required])

})
  ngOnInit(): void {
    this.contactUsRestService.getAllContact();
  }

  openDetailsDailog(MSG1:any,Email1:any){
    // debugger
    this.center={
      email:Email1,
      msg:MSG1
    }
    this.dialog.open(this.callDetailsDailog);
  }
  Detail:FormGroup=new FormGroup({
    msg:new FormControl({value: '', disabled: true}),
    email:new FormControl({value: '', disabled: true}),
    
  })

  openTestimonialDailog(iDD:any,testimonial1:any ,sub:any,ms:any){
    this.center={
      id:iDD,
      testimonial:testimonial1,
      subject:sub,
      msg:ms


    }

    const testimonialDaialog=this.dialog.open(this.callTestimonialDailog);

    testimonialDaialog.afterClosed().subscribe((result)=>{
    if(result!=undefined)
    {
      if(result=='yes'){
     this.yes();
     this.dialog.closeAll();
      }
      else if(result=='no'){
       this.no();
       this.dialog.closeAll();
      }
    }
  })
}

  yes(){
    this.TestimonialForm.controls['id'].setValue(this.center.id);
    this.TestimonialForm.controls['testimonial'].setValue(1);
    this.contactUsRestService.updatebytestimonial(this.TestimonialForm.value);

  }

  no()
  {
    
    this.TestimonialForm.controls['id'].setValue(this.center.id);
    this.TestimonialForm.controls['testimonial'].setValue(0);
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
