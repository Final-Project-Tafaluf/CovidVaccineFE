import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customeDate'
})
export class CustomeDatePipe implements PipeTransform {

  date:Date=new Date()
  transform(date: string, ...args: unknown[]): string {
    //13-3-2022;
    date=`${this.date.getDate()} - ${this.date.getMonth()+1 } - ${this.date.getFullYear()}`
    return date;
  }


}
// {{DATE|CUSTONMEdATE}}
