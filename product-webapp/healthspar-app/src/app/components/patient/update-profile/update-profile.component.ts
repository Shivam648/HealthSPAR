import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientProfileService } from 'src/app/service/patient-profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
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
  patientProfileForm: FormGroup;
  isSubmitted: boolean = false;
  step: any = 1;

  constructor(
    private patientService: PatientProfileService,
    private formBuilder: FormBuilder,
    private route: Router) {
    this.patientProfileForm = this.formBuilder.group({
      basicDetailForm: this.formBuilder.group({
        patientName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
        email: ['', [Validators.required, Validators.email]],
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

  get basicDetails() {
    return this.patientProfileForm.get('basicDetailForm');
  }
  get addressDetails() {
    return this.patientProfileForm.get('addressDetailForm');
  }
  get medicalDetails() {
    return this.patientProfileForm.get('medicalDetailForm');
  }

  ngOnInit(): void {
    this.getPatient();
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
    if (this.step == 5 && this.patientProfileForm.valid) {
      const updatedPatientData: Patient = {
        patientName: this.patientProfileForm.value.basicDetailForm.patientName,
        email: this.patientProfileForm.value.basicDetailForm.email,
        phoneNumber: this.patientProfileForm.value.basicDetailForm.phoneNumber,
        dob: this.patientProfileForm.value.basicDetailForm.dob,
        bloodGroup: this.patientProfileForm.value.basicDetailForm.bloodGroup,
        gender: this.patientProfileForm.value.basicDetailForm.gender,
        cityName: this.patientProfileForm.value.addressDetailForm.cityName,
        district: this.patientProfileForm.value.addressDetailForm.district,
        state: this.patientProfileForm.value.addressDetailForm.state,
        country: this.patientProfileForm.value.addressDetailForm.country,
        zip: this.patientProfileForm.value.addressDetailForm.zip,
        patientId: this.patient.patientId,
        medicalHistory: this.patientProfileForm.value.medicalDetailForm.medicalHistory,
        medicineHistory: this.patientProfileForm.value.medicalDetailForm.medicineHistory,
        treatmentHistory: this.patientProfileForm.value.medicalDetailForm.treatmentHistory,
      };

      this.patient = updatedPatientData;

      this.patientService.updatePatientProfile(this.patient.patientId, this.patient).subscribe(
        (response: Patient) => {
          console.log('Patient profile updated successfully:', response);
        },
        (error) => {
          console.error('Error updating patient profile:', error);
        }
      );

      this.route.navigate(['/patient/display']);
    }
  }



  public getPatient(): void {
    const patientId = localStorage.getItem('patientId');
    if (patientId !== null) {
      this.patientService.getPatientProfile(patientId).subscribe(
        (response) => {
          this.patient = response;

          this.basicDetails?.patchValue({
            patientName: this.patient.patientName,
            email: this.patient.email,
            phoneNumber: this.patient.phoneNumber,
            dob: this.patient.dob,
            bloodGroup: this.patient.bloodGroup,
            gender: this.patient.gender,
          });

          this.addressDetails?.patchValue({
            cityName: this.patient.cityName,
            district: this.patient.district,
            state: this.patient.state,
            country: this.patient.country,
            zip: this.patient.zip,
          });

          this.medicalDetails?.patchValue({
            medicalHistory: this.patient.medicalHistory,
            medicineHistory: this.patient.medicineHistory,
            treatmentHistory: this.patient.treatmentHistory,
          });
        }
      )
    }
  }



  previous() {
    this.step = this.step - 1;
  }
}
