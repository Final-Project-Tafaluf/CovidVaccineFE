import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/Service/home.service';

@Component({
  selector: 'app-create-health-center',
  templateUrl: './create-health-center.component.html',
  styleUrls: ['./create-health-center.component.scss']
})
export class CreateHealthCenterComponent implements OnInit {
  CreateForm:FormGroup=new FormGroup({
    center_Name: new FormControl(),
    center_Phone:new FormControl(),
    center_Location:new FormControl(),
    centerVaccines:new FormControl(),
    scheduals:new FormControl()
  })
constructor(private home:HomeService) { }

ngOnInit(): void {
}
save(){
  this.home.createHelthCenter(this.CreateForm.value);
  window.location.reload();
}
// uploadImage(file:any){
//   if(file.length===0)
//   return;
//   const uploadfile=<File>file[0];
//   // {
//   //   file[0]:'photo1.png',

//   // }
//   const formData=new FormData();
//   formData.append('file',uploadfile,uploadfile.name);
//   this.home.uploadAttachment(formData);
// }

}
