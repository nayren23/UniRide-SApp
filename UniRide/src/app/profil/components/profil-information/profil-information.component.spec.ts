import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilInformationComponent } from './profil-information.component';

describe('ProfilInformationComponent', () => {
  let component: ProfilInformationComponent;
  let fixture: ComponentFixture<ProfilInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilInformationComponent]
    });
    fixture = TestBed.createComponent(ProfilInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
