import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleAppointmentComponent } from './reschedule-appointment.component';

describe('RescheduleAppointmentComponent', () => {
  let component: RescheduleAppointmentComponent;
  let fixture: ComponentFixture<RescheduleAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RescheduleAppointmentComponent]
    });
    fixture = TestBed.createComponent(RescheduleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
