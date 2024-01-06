import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersListComponent } from './passengers-list.component';

describe('PassengersListComponent', () => {
  let component: PassengersListComponent;
  let fixture: ComponentFixture<PassengersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengersListComponent]
    });
    fixture = TestBed.createComponent(PassengersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
