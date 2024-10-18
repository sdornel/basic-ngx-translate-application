import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class JsonConverterService {

  constructor(
    private translate: TranslateService,
  ) {}

  getTranslationKeys(): Promise<Array<string>> {
    const lang = this.translate.currentLang || Language.French;
    return new Promise((resolve) => {
      this.translate.getTranslation(lang).subscribe((translations: { [key: string]: string }) => {
        resolve(Object.keys(translations));
      });
    });
  }
}

