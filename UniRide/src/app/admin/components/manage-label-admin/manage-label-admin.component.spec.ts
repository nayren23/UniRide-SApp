import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLabelAdminComponent } from './manage-label-admin.component';

describe('ManageLabelAdminComponent', () => {
  let component: ManageLabelAdminComponent;
  let fixture: ComponentFixture<ManageLabelAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageLabelAdminComponent]
    });
    fixture = TestBed.createComponent(ManageLabelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
