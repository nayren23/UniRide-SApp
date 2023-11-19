import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTripComponent } from './create-trip.component';

describe('CreateTripComponent', () => {
  let component: CreateTripComponent;
  let fixture: ComponentFixture<CreateTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTripComponent]
    });
    fixture = TestBed.createComponent(CreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
