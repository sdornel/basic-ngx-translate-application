import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Language } from './enums/language.enum';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of, Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;

  const onTranslationChange$ = new Subject();
  const onLangChange$ = new Subject();
  const onDefaultLangChange$ = new Subject();

  const mockTranslateService = {
    setDefaultLang: jasmine.createSpy('setDefaultLang'),
    use: jasmine.createSpy('use'),
    get: jasmine.createSpy('get').and.returnValue(of('mocked value')),
    onTranslationChange: onTranslationChange$.asObservable(),
    onLangChange: onLangChange$.asObservable(),
    onDefaultLangChange: onDefaultLangChange$.asObservable(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [AppComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
