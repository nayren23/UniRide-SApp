import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoSummaryComponent } from './user-info-summary.component';

describe('UserInfoSummaryComponent', () => {
  let component: UserInfoSummaryComponent;
  let fixture: ComponentFixture<UserInfoSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoSummaryComponent]
    });
    fixture = TestBed.createComponent(UserInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
