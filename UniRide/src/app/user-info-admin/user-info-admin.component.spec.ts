import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoAdminComponent } from './user-info-admin.component';

describe('UserInfoAdminComponent', () => {
  let component: UserInfoAdminComponent;
  let fixture: ComponentFixture<UserInfoAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoAdminComponent]
    });
    fixture = TestBed.createComponent(UserInfoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
