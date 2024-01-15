import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPdfComponent } from './display-pdf.component';

describe('DisplayPdfComponent', () => {
  let component: DisplayPdfComponent;
  let fixture: ComponentFixture<DisplayPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayPdfComponent]
    });
    fixture = TestBed.createComponent(DisplayPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
