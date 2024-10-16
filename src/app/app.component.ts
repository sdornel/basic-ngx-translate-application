import { Component, OnInit } from '@angular/core';
import { JsonConverterService } from './services/json-converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  paragraphs: Array<string> = [];

  constructor(
    private jsonConverterService: JsonConverterService,
  ) {}

  // TODO: Add a way to change the entire text into one language. Right now it goes by paragraph.

  ngOnInit(): void {
    this.loadTranslationKeys();
  }

  async loadTranslationKeys() {
    const keys: Array<string> = await this.jsonConverterService.getTranslationKeys();
    this.paragraphs = keys.filter((key: string) => key.includes('PARAGRAPH')); // filter out keys related to paragraphs
  }
}
