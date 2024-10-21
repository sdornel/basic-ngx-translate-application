import { Component, OnInit } from '@angular/core';
import { CustomTranslationService } from './services/custom-translation-service.service';
import { Language } from './enums/language.enum';
import { JsonConverterService } from './services/json-converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  paragraphs: Array<string> = [];
  Language = Language;

  constructor(
    private customTranslationService: CustomTranslationService,
    private jsonConverterService: JsonConverterService
  ) {}

  ngOnInit(): void {
    this.loadTranslationKeys();
  }

  async loadTranslationKeys() {
    const keys: Array<string> = await this.jsonConverterService.getTranslationKeys();
    this.paragraphs = keys.filter((key: string) => key.includes('PARAGRAPH'));
  }

  // Change the language globally
  globalSwitchLanguage(event: Event) {
    const language: Language = (event.target as HTMLSelectElement).value as Language;
    this.customTranslationService.changeLanguage(language);
  }
}
