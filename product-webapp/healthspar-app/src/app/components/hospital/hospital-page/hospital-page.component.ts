import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Hospital } from 'src/app/model/hospital';
import { AppointmentService } from 'src/app/service/appointment.service';
import { HospitalService } from 'src/app/service/hospital.service';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-hospital-page',
  templateUrl: './hospital-page.component.html',
  styleUrls: ['./hospital-page.component.css'],
})
export class HospitalPageComponent implements OnInit {
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
  patientName: string = '';
  email: string = '';
  phoneNumber: string = '';
  patientId:string='';

  constructor(
    private hospitalService: HospitalService,
    private patientService: PatientProfileService,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private route: Router,
    private router:ActivatedRoute
  
  ) {

   

    this.appointmentForm = this.formBuilder.group({
      patientName: [this.patientName, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      email: [this.email, [Validators.required, Validators.email]],
      phoneNumber: [
        this.phoneNumber,
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
    this.router.params.subscribe((params) => {
      const hospitalId = +params['id'];
      this.getHospitalById(hospitalId);
    });
  }

  public getHospitalById(hospitalId: number): void {
    this.hospitalService.getHospitalProfile(hospitalId).subscribe(
      (response: Hospital) => {
        this.hospital = response;
        console.log(this.hospital);

      }
    )
  }

  public getPatient():void{
    const patientId = localStorage.getItem('patientId');
    if(patientId!==null){
      this.patientService.getPatientProfile(patientId).subscribe(
        (response)=>{
          this.patientId=response.patientId;
          this.patientName=response.patientName;
          this.email=response.email;
          this.phoneNumber=response.phoneNumber;
        }
      )
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log("submited");

    if (this.appointmentForm.valid) {
      const localDateTimeValue = this.appointmentForm.get('dateTime')?.value;
      const isoDateTime = new Date(localDateTimeValue).toISOString().slice(0, 19);

      const appointmentData: Appointment = {
        ...this.appointmentForm.value,
        patientId: this.patientId,
        hospitalId: this.hospital.hospitalId,
        action: 'INITIALIZED',
        dateTime: isoDateTime,
      };

      this.appointmentService.addAppointment(appointmentData).subscribe(
        (response) => {
          console.log("Appointment Initialized : ", response);
          this.route.navigate(['/patient/index']);
        }
      );

    }
  }

}