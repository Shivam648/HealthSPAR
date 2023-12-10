import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { AppointmentService } from 'src/app/service/appointment.service';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe, private route: Router,private hospitalService:HospitalService) { }

  ngOnInit(): void {
    this.getHospital();    
    const trigger = $('.hamburger');
    const overlay = $('.overlay');
    let isClosed = false;

    trigger.click(() => {
      hamburger_cross();
    });

    function hamburger_cross() {
      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }

    $('[data-toggle="offcanvas"]').click(() => {
      $('#wrapper').toggleClass('toggled');
    });
  }
  private getHospital(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");
  
    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);
  
      if (!isNaN(hospitalId)) {
        this.hospitalService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            this.getAppointmentForHospital(response.hospitalId)
          },
          (error) => {
            console.error("Error fetching hospital profile:", error);
          }
        );
      } else {
        console.error("Invalid hospitalId in localStorage:", hospitalIdString);
      }
    } else {
      console.error("hospitalId not found in localStorage");
    }
  }



  public getAppointmentForHospital(hospitalId: number) {
    this.appointmentService.getAppointmentsForHospital(hospitalId).subscribe(
      (response: Appointment[]) => {
        this.appointments = response;
        console.log(this.appointments);
        
        this.appointments.sort(
          (a, b) => {
            const dateA = new Date(a.dateTime);
            const dateB = new Date(b.dateTime);
            return dateA.getTime() - dateB.getTime();
          }
        )
      }
    )
  }

  onBookClick(appointmentId: number): void {
    this.route.navigate(['/hospital/reschedule', appointmentId]);
  }

  cancelAppointment(appointmentId: number): void {
    const isConfirmed = window.confirm('Are you sure you want to remove this appointment?');
    if (isConfirmed) {
      this.appointmentService.cancelAppointment(appointmentId).subscribe(
        (response: Appointment) => {
          console.log('Appointment canceled successfully:', response);
          this.refreshAppointments();
        },
        (error) => {
          console.error('Error cancelling appointment:', error);
        }
      );

    }
  }

  refreshAppointments() {
    this.getAppointmentForHospital(0);
  }


}
