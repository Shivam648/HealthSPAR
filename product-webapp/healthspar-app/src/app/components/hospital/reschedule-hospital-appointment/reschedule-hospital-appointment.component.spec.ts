import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleHospitalAppointmentComponent } from './reschedule-hospital-appointment.component';

describe('RescheduleHospitalAppointmentComponent', () => {
  let component: RescheduleHospitalAppointmentComponent;
  let fixture: ComponentFixture<RescheduleHospitalAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RescheduleHospitalAppointmentComponent]
    });
    fixture = TestBed.createComponent(RescheduleHospitalAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
