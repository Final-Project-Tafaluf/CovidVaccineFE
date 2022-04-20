import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customeDate'
})
export class CustomeDatePipe implements PipeTransform {

  date:Date=new Date()
  transform(date: string, ...args: unknown[]): string {
    //13-3-2022;
    if(date == ""){
      date= new Date().toISOString();
    }    
    var [yyyy,mm,dd,hh,mi] = date.split(/[/:\-T]/)  ; 
    return `${dd}/${mm}/${yyyy}`;
  }


}
// {{DATE|CUSTONMEdATE}}
