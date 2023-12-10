import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Appointment } from 'src/app/model/appointment';
import { Hospital } from 'src/app/model/hospital';
import { AppointmentService } from 'src/app/service/appointment.service';
import { HospitalService } from 'src/app/service/hospital.service';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  hospitals: Hospital[] = [];
  patientId:string='';

  constructor(private appointmentService: AppointmentService, private hospitalService: HospitalService, private datePipe: DatePipe, private route: Router,private patientService:PatientProfileService) { }

  ngOnInit(): void {
    this.getPatient();
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

  public getPatient():void{
    const patientId = localStorage.getItem('patientId');
    if(patientId!==null){
      this.patientService.getPatientProfile(patientId).subscribe(
        (response)=>{
          this.getAppointmentForPatients(response.patientId);
        }
      )
    }
  }

  public getAppointmentForPatients(patientId: string) {
    this.appointmentService.getAppointmentsForPatient(patientId).subscribe(
      (response: Appointment[]) => {
        this.appointments = response;
        this.appointments.sort(
          (a, b) => {
            const dateA = new Date(a.dateTime);
            const dateB = new Date(b.dateTime);
            return dateA.getTime() - dateB.getTime();
          }
        );

        for (const appointment of this.appointments) {
          this.hospitalService.getHospitalProfile(appointment.hospitalId).subscribe(
            (response: Hospital) => {
              this.hospitals.push(response);
            }
          );
        }
        console.log(this.appointments);
      }
    )
  }

  onBookClick(appointmentId: number): void {
    this.route.navigate(['/patient/reschedule', appointmentId]);
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
    this.getAppointmentForPatients(this.patientId);
  }





}
