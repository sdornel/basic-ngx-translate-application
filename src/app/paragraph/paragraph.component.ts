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
  Language = Language; // make available in template
  currentLanguage: Language = Language.French;
  translatedText: string = '';

  constructor(private customTranslateService: CustomTranslationService) {}

  ngOnInit(): void {
    this.loadTranslation(this.currentLanguage);
  }

  loadTranslation(language: Language) {
    this.customTranslateService.getTranslationByKey(language || Language.French, this.translationKey)
      .subscribe(translatedText => {
        this.translatedText = translatedText;
      });
  }

  switchLanguage(event: Event) {
    const language: Language = (event.target as HTMLSelectElement).value as Language;
    this.currentLanguage = language;
    this.loadTranslation(language);
  }
}
