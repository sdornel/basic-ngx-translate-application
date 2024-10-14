import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Language } from './enums/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Language = Language; // make enum accessible in template

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(Language.French);
  }

  switchLanguage(event: Event) {
    const language = (event.target as HTMLSelectElement).value
    this.translate.use(language);
  }
}
