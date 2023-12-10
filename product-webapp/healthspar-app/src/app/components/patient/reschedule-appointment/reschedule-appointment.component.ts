import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Hospital } from 'src/app/model/hospital';
import { AppointmentService } from 'src/app/service/appointment.service';
import { HospitalService } from 'src/app/service/hospital.service';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css']
})
export class RescheduleAppointmentComponent implements OnInit {
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
  patientId:string='';
  

  constructor(private appointmentService: AppointmentService, private formBuilder: FormBuilder, private hospitalService: HospitalService,private route: Router,private patientService:PatientProfileService,
    private router:ActivatedRoute) {
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
    this.getPatient();
    this.router.params.subscribe(
      (params)=>{
        const appointmentId=+params['id'];
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
        patientId:this.appointment.patientId,
        hospitalId:this.appointment.hospitalId,
        dateTime: isoDateTime,
      };

  
      this.appointmentService.rescheduleAppointment(this.appointment.appointmentId, appointmentData).subscribe(
        (response: Appointment) => {
          this.appointment = response;
          console.log(this.appointment);
          this.route.navigate(['patient/appointment']);
        },
        (error) => {
          console.error("Error rescheduling appointment:", error);
        }
      );
    }
  }
  

  public getHospitalById(hospitalId: number): void {
    this.hospitalService.getHospitalProfile(hospitalId).subscribe(
      (response: Hospital) => {
        this.hospital = response;
        console.log(this.hospital);

      }
    )
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

  public getPatient():void{
    const patientId = localStorage.getItem('patientId');
    if(patientId!==null){
      this.patientService.getPatientProfile(patientId).subscribe(
        (response)=>{
          this.patientId=response.patientId;
        }
      )
    }
  }

  public getAppointmentById(appointmentId: number): void {
    this.appointmentService.getAppointmentsbyId(appointmentId).subscribe(
      (response: Appointment) => {
        this.appointment = response;
        this.patchFormWithAppointment(this.appointment);
        this.getHospitalById(this.appointment.hospitalId)
        console.log(this.appointment);

      }
    )
  }

}
