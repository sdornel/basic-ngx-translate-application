import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Language } from '../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslationService extends TranslateService {
  private languageSubject = new BehaviorSubject<Language>(Language.French);

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

  // Change language globally
  changeLanguage(lang: Language): void {
    this.use(lang);
    this.languageSubject.next(lang);
  }

  // Observe global language changes
  onLanguageChange(): Observable<Language> {
    return this.languageSubject.asObservable();
  }

  // Fetch translation for specific language
  getTranslationByKey(lang: Language, key: string): Observable<string> {
    return this.getTranslation(lang).pipe(
      map(translations => translations[key] || key)
    );
  }

  // Fetch translation for current global language
  getCurrentTranslationByKey(key: string): Observable<string> {
    const currentLanguage = this.languageSubject.value;
    return this.getTranslationByKey(currentLanguage, key);
  }
}
