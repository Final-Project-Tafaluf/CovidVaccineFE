import { Component } from '@angular/core';
import { LangService } from './Services/language/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CovidVaccineFE';
  direction:any;
  constructor(private langService: LangService,){this.checkLanguage()}
  async checkLanguage() {
    await this.langService.init();
    // this.direction = this.langService.direction;
    // document.dir = this.direction;
  }
}
