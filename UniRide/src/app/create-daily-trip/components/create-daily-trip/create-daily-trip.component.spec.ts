import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDailyTripComponent } from './create-daily-trip.component';

describe('CreateDailyTripComponent', () => {
  let component: CreateDailyTripComponent;
  let fixture: ComponentFixture<CreateDailyTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDailyTripComponent]
    });
    fixture = TestBed.createComponent(CreateDailyTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
