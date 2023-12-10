import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {
  patient: Patient = {
    patientName: '',
    email: '',
    phoneNumber: '',
    dob: new Date(),
    bloodGroup: '',
    gender: '',
    cityName: '',
    district: '',
    state: '',
    country: '',
    zip: '',
    patientId: '',
    medicalHistory: '',
    medicineHistory: '',
    treatmentHistory: '',
  };
  dbImage: any;

  constructor(private patientService: PatientProfileService, private router: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
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

  

  public getPatient(): void {
    const patientId = localStorage.getItem('patientId');
    if (patientId !== null) {
      this.patientService.getPatientProfile(patientId).subscribe(
        (response) => {
          this.patient = response
          this.dbImage = `http://localhost:8090/get/image/${this.patient.fileName}`;
          console.log(this.patient);
        }
      )
    }
  }

}