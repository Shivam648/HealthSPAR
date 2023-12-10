import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalSidenavComponent } from './hospital-sidenav.component';

describe('HospitalSidenavComponent', () => {
  let component: HospitalSidenavComponent;
  let fixture: ComponentFixture<HospitalSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalSidenavComponent]
    });
    fixture = TestBed.createComponent(HospitalSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
