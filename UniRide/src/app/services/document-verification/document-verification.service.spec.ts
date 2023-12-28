import { TestBed } from '@angular/core/testing';

import { DocumentVerificationService } from './document-verification.service';

describe('DocumentVerificationService', () => {
  let service: DocumentVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
