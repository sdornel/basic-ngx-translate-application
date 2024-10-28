import { Component, Input, OnInit } from '@angular/core';
import { CustomTranslationService } from '../services/custom-translation-service.service';
import { Language } from '../enums/language.enum';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {
  @Input() translationKey!: string;
  @Input() selectedGlobalLanguage!: Language; // Uses ngModel
  translatedText: string = '';
  Language = Language; // make available in template

  constructor(private customTranslateService: CustomTranslationService) {}

  ngOnInit(): void {
    // Listen for global language changes
    this.customTranslateService.onLanguageChange().subscribe(() => {
      this.loadTranslation();
    });
  }

  // Load translation for current global language
  loadTranslation() {
    this.customTranslateService.getCurrentTranslationByKey(this.translationKey)
      .subscribe(translatedText => {
        this.translatedText = translatedText;
      });
  }

  // Handle language change event
  switchLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement?.value as Language;
    if (language) {
      this.loadTranslationByLanguage(language);
    }
  }

  // Load translation for specific language
  loadTranslationByLanguage(language: Language) {
    this.customTranslateService.getTranslationByKey(language, this.translationKey)
      .subscribe(translatedText => {
        this.translatedText = translatedText;
      });
  }
}
