import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkScheduleStatus'
})
export class CheckScheduleStatusPipe implements PipeTransform {

  transform(status:any, ...args: any[]): unknown {
    // debugger;
    if(new Date() >new Date(args[0]) && status != 'Taken' ){
      status = 'Absent';
    }
    return status;
  }

}
