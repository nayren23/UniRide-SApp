import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSearchResultComponent } from './trip-search-result.component';

describe('TripSearchResultComponent', () => {
  let component: TripSearchResultComponent;
  let fixture: ComponentFixture<TripSearchResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripSearchResultComponent]
    });
    fixture = TestBed.createComponent(TripSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
