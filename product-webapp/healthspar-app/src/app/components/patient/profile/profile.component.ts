import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit {
  patientProfileForm: FormGroup;
  isSubmitted: boolean = false;
  step: any = 1;
  email = localStorage.getItem('email');
  name = localStorage.getItem('name');

  @ViewChild('dateInput', { static: false }) dateInput!: ElementRef<HTMLInputElement>;

  constructor(private profileService: PatientProfileService, private formBuilder: FormBuilder, private route: Router) {
    this.patientProfileForm = this.formBuilder.group({
      basicDetailForm: this.formBuilder.group({
        patientName: [this.name, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
        email: [this.email, [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
        dob: [new Date(), Validators.required],
        bloodGroup: ['null', Validators.required],
        gender: ['null', Validators.required],
      }),
      addressDetailForm: this.formBuilder.group({
        cityName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
        district: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
        state: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
        country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
        zip: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6), Validators.maxLength(6)]],
      }),
      medicalDetailForm: this.formBuilder.group({
        medicalHistory: [''],
        medicineHistory: [''],
        treatmentHistory: [''],
      })
    });
  }

  ngAfterViewInit() {
    const currentDate = new Date();

    const dateInputElement: HTMLInputElement = this.dateInput.nativeElement;

    dateInputElement.max = currentDate.toISOString().split('T')[0];
  }



  get basicDetails() {
    return this.patientProfileForm.get('basicDetailForm');
  }
  get addressDetails() {
    return this.patientProfileForm.get('addressDetailForm');
  }
  get medicalDetails() {
    return this.patientProfileForm.get('medicalDetailForm');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.patientProfileForm.controls['basicDetailForm'].invalid && this.step == 1) {
      return
    }

    if (this.patientProfileForm.controls['addressDetailForm'].invalid && this.step == 2) {
      return
    }
    this.step = this.step + 1;

    if (this.step == 4 && this.patientProfileForm.valid) {

      const patientData: Patient = {
        patientId: '',
        patientName: this.basicDetails?.get('patientName')?.value,
        email: this.basicDetails?.get('email')?.value,
        phoneNumber: this.basicDetails?.get('phoneNumber')?.value,
        dob: this.basicDetails?.get('dob')?.value,
        bloodGroup: this.basicDetails?.get('bloodGroup')?.value,
        gender: this.basicDetails?.get('gender')?.value,
        cityName: this.addressDetails?.get('cityName')?.value,
        district: this.addressDetails?.get('district')?.value,
        state: this.addressDetails?.get('state')?.value,
        country: this.addressDetails?.get('country')?.value,
        zip: this.addressDetails?.get('zip')?.value,
        medicalHistory: this.medicalDetails?.get('medicalHistory')?.value,
        medicineHistory: this.medicalDetails?.get('medicineHistory')?.value,
        treatmentHistory: this.medicalDetails?.get('treatmentHistory')?.value,
      }


      this.profileService.addPatientProfile(patientData).subscribe(
        (response) => {
          console.log('Patient added successfully:', response);
          this.getPatientByEmail(response.email)
          this.route.navigate(['/patient/index']);
        }
      );
    }
  }

  getPatientByEmail(email: string): void {
    this.profileService.getPatientByEmail(email).subscribe(
      (response) => {
        localStorage.setItem("patientId", response.patientId);
      }
    )
  }

  previous() {
    this.step = this.step - 1;
  }
}
