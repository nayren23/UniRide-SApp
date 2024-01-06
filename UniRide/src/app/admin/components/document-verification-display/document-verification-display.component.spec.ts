import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentVerificationDisplayComponent } from './document-verification-display.component';

describe('DocumentVerificationDisplayComponent', () => {
  let component: DocumentVerificationDisplayComponent;
  let fixture: ComponentFixture<DocumentVerificationDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentVerificationDisplayComponent]
    });
    fixture = TestBed.createComponent(DocumentVerificationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
