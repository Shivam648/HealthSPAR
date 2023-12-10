import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHospitalDetailsComponent } from './update-hospital-details.component';

describe('UpdateHospitalDetailsComponent', () => {
  let component: UpdateHospitalDetailsComponent;
  let fixture: ComponentFixture<UpdateHospitalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHospitalDetailsComponent]
    });
    fixture = TestBed.createComponent(UpdateHospitalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
