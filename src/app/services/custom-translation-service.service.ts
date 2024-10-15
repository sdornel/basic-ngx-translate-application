import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Language } from '../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslationService extends TranslateService {

  constructor(translate: TranslateService) {
    super(
      translate.store,
      translate.currentLoader,
      translate.compiler,
      translate.parser, 
      translate.missingTranslationHandler,
      true,
      true,
      true,
      Language.French
    );
  }

  // fetch translation for specific key and language
  getTranslationByKey(lang: Language, key: string): Observable<string> {
    return this.getTranslation(lang).pipe(
      switchMap((translations: { [key: string]: string }) => {
        if (translations[key]) { // translation found
          return new Observable<string>((observer) => {
            observer.next(translations[key]);
            observer.complete();
          });
        } else { // translation not found. use default
          return this.getTranslation(Language.French).pipe(
            map((defaultTranslations: { [key: string]: string }) =>
              defaultTranslations[key]
            )
          );
        }
      })
    );
  }
}
