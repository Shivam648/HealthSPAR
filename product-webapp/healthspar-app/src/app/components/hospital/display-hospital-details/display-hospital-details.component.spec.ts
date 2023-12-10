import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHospitalDetailsComponent } from './display-hospital-details.component';

describe('DisplayHospitalDetailsComponent', () => {
  let component: DisplayHospitalDetailsComponent;
  let fixture: ComponentFixture<DisplayHospitalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayHospitalDetailsComponent]
    });
    fixture = TestBed.createComponent(DisplayHospitalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
