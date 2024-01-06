import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendMailComponent } from './resend-mail.component';

describe('ResendMailComponent', () => {
  let component: ResendMailComponent;
  let fixture: ComponentFixture<ResendMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResendMailComponent]
    });
    fixture = TestBed.createComponent(ResendMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
