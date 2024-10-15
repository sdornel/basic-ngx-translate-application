import { TestBed } from '@angular/core/testing';

import { CustomTranslationService } from './custom-translation-service.service';

describe('CustomTranslationServiceService', () => {
  let service: CustomTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
