import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatePassengerComponent } from './validate-passenger.component';

describe('ValidatePassengerComponent', () => {
  let component: ValidatePassengerComponent;
  let fixture: ComponentFixture<ValidatePassengerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatePassengerComponent]
    });
    fixture = TestBed.createComponent(ValidatePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
