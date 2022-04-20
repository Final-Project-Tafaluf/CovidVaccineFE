import { Injectable } from '@angular/core';
import {english} from './lang/labels_en';
import {arabic} from './lang/labels_ar';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang :string='en';
  direction :string ='ltr';
  lables :any;
  constructor(    private localStorageService:LocalStorageService,) {
    // this.init();
  }
  async init() {
    // debugger
    let result = this.localStorageService.getLanguage();
    if(result && (result == "en")) {
      this.initiateLangService('en');
    } else {
      this.initiateLangService('ar');
    }
  }

  initiateLangService(lang:string){
    if(lang=='ar'){
      this.lang='ar';
      this.direction= 'rtl'; 
    } else {
      this.lang = 'en';
      this.direction = 'ltr';
    }
    this.lables=this.getLabels(lang);
   }

   getLabels(lang:string){
    if(lang=='ar'){
      this.lables=arabic;
    }
    else{
      this.lables=english;
    }
    return this.lables;
   }

   translate(label:string){
     return this.lables[label];
   }

//    getLabelByLang(label:string, lang:string){
//     if(lang=='ar')
//       return arabic[label];
//     else return english[label];
//  }

}
