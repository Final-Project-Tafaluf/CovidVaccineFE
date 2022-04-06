import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private dialog:MatDialog,public home:HomeService) { }

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

  addData(){
    this.home.createHome(this.homeElement);
  }
  updateData(){
    this.home.updateHome(this.homeElement)
  }
}
