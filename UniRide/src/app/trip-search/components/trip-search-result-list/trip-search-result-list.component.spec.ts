import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSearchResultListComponent } from './trip-search-result-list.component';

describe('TripSearchResultListComponent', () => {
  let component: TripSearchResultListComponent;
  let fixture: ComponentFixture<TripSearchResultListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripSearchResultListComponent]
    });
    fixture = TestBed.createComponent(TripSearchResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
