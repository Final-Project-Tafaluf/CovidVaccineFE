import { Pipe, PipeTransform } from '@angular/core';
import {LangService} from "../Services/language/lang.service";

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {

  constructor(private langService :LangService){}

    transform(label:string) {
        return this.langService.translate(label);
  }
}