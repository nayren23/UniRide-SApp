import { TestBed } from '@angular/core/testing';

import { LabelManagementService } from './label-management.service';

describe('LabelManagementService', () => {
  let service: LabelManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
