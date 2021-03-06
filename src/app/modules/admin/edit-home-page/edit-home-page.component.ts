import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/Services/rest/home.service';
import {MatTable} from '@angular/material/table';



@Component({
  selector: 'app-edit-home-page',
  templateUrl: './edit-home-page.component.html',
  styleUrls: ['./edit-home-page.component.scss']
})
export class EditHomePageComponent implements OnInit {
  @ViewChild('callUpdateDailog') callUpdateDailog! :TemplateRef<any>
  @ViewChild('callCreateDailog') callCreateDailog! :TemplateRef<any>

  constructor(private dialog:MatDialog,public home:HomeService) { }

  element : any ={}
  homeElement :FormGroup =new FormGroup
  (
    {
    id:new FormControl(),
    header_Logo:new FormControl(),
    home_Image:new FormControl(),
    contact_Image:new FormControl(),
    about_Image:new FormControl(),
    about_Text:new FormControl(),
    news_Imageone:new FormControl(),
    news_Textone:new FormControl(),
    news_Imagetwo:new FormControl(),
    news_Texttwo:new FormControl(),
    news_Imagethree:new FormControl(),
    news_Textthree:new FormControl(),
    }
  )

  ngOnInit(): void {
    this.home.getHome();
  }
Create(){
  this.home.createHome(this.homeElement);
  window.location.reload();
}
  createDialog(){
    this.dialog.open(this.callCreateDailog);

  }
  updateDialog(data :any){
    debugger
    this.element={
      id:data.id,
      header_Logo:data.header_Logo,
      home_Image:data.home_Image,
      contact_Image:data.contact_Image,
      about_Image:data.about_Image,
      about_Text:data.about_Text,
      news_Imageone:data.news_Imageone,
      news_Textone:data.news_Textone,
      news_Imagetwo:data.news_Imagetwo,
      news_Texttwo:data.news_Texttwo,
      news_Imagethree:data.news_Imagethree,
      news_Textthree:data.news_Textthree,
    }
    this.homeElement.controls['id'].setValue(this.element.id)

    this.dialog.open(this.callUpdateDailog);

  }

  uploadFile(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.uploadAttachment(fromData);
  }


  uploadFile2(file:any){
    if(file.length===0){
      return ;
    }
    // debugger
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.uploadHome(fromData);
  }
  uploadHome(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.uploadHome(fromData);
  }
  uploadAbout(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.uploadAbout(fromData);
  }
  uploadContact(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.uploadContact(fromData);
  }
  upload1(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.upload1(fromData);
  }
  upload2(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.upload2(fromData);
  }
  upload3(file:any){
    if(file.length===0){
      return ;
    }
    let fileUpload=<File>file[0];
    // file[0]:'angular.png';
    const fromData=new FormData();
    fromData.append('file',fileUpload,fileUpload.name);
    this.home.upload3(fromData);
  }

  update(){
    debugger
    this.home.updateHome(this.homeElement.value);
  }




}
