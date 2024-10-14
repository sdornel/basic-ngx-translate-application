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

  it('should set default language to French on init', () => {
    component.ngOnInit();
    expect(translateService.setDefaultLang).toHaveBeenCalledWith(Language.French);
  });

  it('should call translate.use() when switchLanguage is triggered', () => {
    const mockEvent = {
      target: {
        value: Language.Spanish
      }
    } as any;

    component.switchLanguage(mockEvent);
    expect(translateService.use).toHaveBeenCalledWith(Language.Spanish);
  });

  it('should have French as the default selectedLanguage', () => {
    expect(mockTranslateService.setDefaultLang).toHaveBeenCalledWith(Language.French);
  });

  it('should switch to the selected language when an option is selected', () => {
    const selectElement: DebugElement = fixture.debugElement.query(By.css('select'));

    selectElement.triggerEventHandler('change', { target: { value: Language.Romanian } });
    fixture.detectChanges();

    expect(mockTranslateService.use).toHaveBeenCalledWith(Language.Romanian);
    expect(mockTranslateService.use).toHaveBeenCalledWith(Language.Romanian); // Expect 'ro'
  });
});
