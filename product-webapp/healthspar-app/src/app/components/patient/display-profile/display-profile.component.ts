import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Patient } from 'src/app/model/patient';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrls: ['./display-profile.component.css']
})
export class DisplayProfileComponent implements OnInit {
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

    this.getPatientById('6518631ba32afb3213588881');


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

  public getPatientById(patientId: string): void {
    this.patientService.getPatientProfile(patientId).subscribe(
      (response: Patient) => {
        this.patient = response
        this.dbImage = `http://localhost:8090/get/image/${this.patient.fileName}`;
        console.log(this.patient);
      }
    )
  }

}