import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripProposedListComponent } from './trip-proposed-list.component';

describe('TripProposedListComponent', () => {
  let component: TripProposedListComponent;
  let fixture: ComponentFixture<TripProposedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripProposedListComponent]
    });
    fixture = TestBed.createComponent(TripProposedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
