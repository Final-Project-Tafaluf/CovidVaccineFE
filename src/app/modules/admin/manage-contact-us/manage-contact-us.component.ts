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

  ngOnInit(): void {
    this.contactUsRestService.getAllContact();
  }

  //detalis
  openDetailsDailog(MSG1:any,Email1:any){
    debugger
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

  
 
/////////////////////////////



  openTestimonialDailog(
    Name1 :any,Subject1:any,MSG1:any,testimonial1:any){
    
     this.center={
       
       name:Name1,
       subject:Subject1,
       msg:MSG1,
       testimonial:testimonial1
      
     }
    
     this.dialog.open(this.callTestimonialDailog);
   
//cont.testimonial
   }

   TestimonialForm:FormGroup=new FormGroup({
     name: new FormControl(),
     subject:new FormControl(),
     msg:new FormControl(),
     testimonial:new FormControl()
     
  })

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
