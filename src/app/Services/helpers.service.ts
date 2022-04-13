import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }
  dateFormater(date:string){  
    if(date == ""){
      date= new Date().toISOString();
    }    
    var [yyyy,mm,dd,hh,mi] = date.split(/[/:\-T]/)  ; 
    return `${dd}/${mm}/${yyyy}`;
  }
}
