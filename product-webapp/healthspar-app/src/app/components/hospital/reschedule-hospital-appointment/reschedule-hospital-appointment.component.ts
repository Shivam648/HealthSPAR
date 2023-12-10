import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Hospital } from 'src/app/model/hospital';
import { AppointmentService } from 'src/app/service/appointment.service';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-reschedule-hospital-appointment',
  templateUrl: './reschedule-hospital-appointment.component.html',
  styleUrls: ['./reschedule-hospital-appointment.component.css']
})
export class RescheduleHospitalAppointmentComponent implements OnInit {
  appointment: Appointment = {
    appointmentId: 0,
    patientId: '',
    hospitalId: 0,
    treatmentType: '',
    dateTime: new Date,
    message: '',
    status: '',
    department: '',
    doctor: '',
    patientName: '',
    email: '',
    phoneNumber: ''
  }

  hospital: Hospital = {
    hospitalId: 0,
    hospitalName: '',
    hospitalWebsite: '',
    hospitalEmail: '',
    hospitalPhoneNumber: '',
    hospitalRating: 0,
    hospitalReviews: [''],
    city: {
      name: '',
      district: '',
      state: '',
      country: '',
      zip: '',
    },
    hospitalAmenities: '',
    numberOfBeds: 0,
    doctors: [],
    frequentlyAskedQuestion: []
  };

  isSubmitted: boolean = false;
  appointmentForm: FormGroup;
  hospitalId: number = 0;


  constructor(private appointmentService: AppointmentService, private formBuilder: FormBuilder, private hospitalService: HospitalService, private route: Router,
    private router: ActivatedRoute) {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)],
      ],
      treatmentType: ['', Validators.required],
      dateTime: ['', Validators.required],
      message: [''],
      department: ['', Validators.required],
      doctor: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.router.params.subscribe(
      (params) => {
        const appointmentId = +params['id'];
        this.getAppointmentById(appointmentId);
      }
    );
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

  onSubmit() {
    this.isSubmitted = true;
    if (this.appointmentForm.valid) {
      const localDateTimeValue = this.appointmentForm.get('dateTime')?.value;
      const isoDateTime = new Date(localDateTimeValue).toISOString().slice(0, 19);

      const appointmentData: Appointment = {
        ...this.appointmentForm.value,
        patientId: this.appointment.patientId,
        hospitalId: this.appointment.hospitalId,
        dateTime: isoDateTime,
      };


      this.appointmentService.rescheduleAppointment(this.appointment.appointmentId, appointmentData).subscribe(
        (response: Appointment) => {
          this.appointment = response;
          console.log(this.appointment);
          this.route.navigate(['hospital/appointment']);
        },
        (error) => {
          console.error("Error rescheduling appointment:", error);
        }
      );
    }
  }


  patchFormWithAppointment(appointment: Appointment) {
    this.appointmentForm.patchValue({
      patientName: appointment.patientName,
      email: appointment.email,
      phoneNumber: appointment.phoneNumber,
      treatmentType: appointment.treatmentType,
      dateTime: appointment.dateTime,
      message: appointment.message,
      department: appointment.department,
      doctor: appointment.doctor,
    });
  }

  private getHospital(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");
  
    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);
  
      if (!isNaN(hospitalId)) {
        this.hospitalService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            this.hospital = response;
            this.hospitalId = response.hospitalId;
            console.log("hospital : ", this.hospital);
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

  public getAppointmentById(appointmentId: number): void {
    this.appointmentService.getAppointmentsbyId(appointmentId).subscribe(
      (response: Appointment) => {
        this.appointment = response;
        this.patchFormWithAppointment(this.appointment);
        this.getHospital();
        console.log(this.appointment);

      }
    )
  }

}
