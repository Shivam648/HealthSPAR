import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDashboardHomeComponent } from './hospital-dashboard-home.component';

describe('HospitalDashboardHomeComponent', () => {
  let component: HospitalDashboardHomeComponent;
  let fixture: ComponentFixture<HospitalDashboardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalDashboardHomeComponent]
    });
    fixture = TestBed.createComponent(HospitalDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
