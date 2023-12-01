import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTripComponent } from './create-trip.component';
import { LogInComponent } from '../log-in/log-in.component';

describe('CreateTripComponent', () => {
  let component: CreateTripComponent;
  let fixture: ComponentFixture<CreateTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTripComponent, LogInComponent]
    });
    fixture = TestBed.createComponent(CreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
