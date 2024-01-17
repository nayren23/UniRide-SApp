import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPassengerListComponent } from './trip-passenger-list.component';

describe('TripPassengerListComponent', () => {
  let component: TripPassengerListComponent;
  let fixture: ComponentFixture<TripPassengerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripPassengerListComponent]
    });
    fixture = TestBed.createComponent(TripPassengerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
