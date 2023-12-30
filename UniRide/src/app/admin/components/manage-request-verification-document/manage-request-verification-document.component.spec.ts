import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequestVerificationDocumentComponent } from './manage-request-verification-document.component';

describe('ManageRequestVerificationDocumentComponent', () => {
  let component: ManageRequestVerificationDocumentComponent;
  let fixture: ComponentFixture<ManageRequestVerificationDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRequestVerificationDocumentComponent]
    });
    fixture = TestBed.createComponent(ManageRequestVerificationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
