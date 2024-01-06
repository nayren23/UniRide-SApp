import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripProposedComponent } from './trip-proposed.component';

describe('TripProposedComponent', () => {
  let component: TripProposedComponent;
  let fixture: ComponentFixture<TripProposedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripProposedComponent]
    });
    fixture = TestBed.createComponent(TripProposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
