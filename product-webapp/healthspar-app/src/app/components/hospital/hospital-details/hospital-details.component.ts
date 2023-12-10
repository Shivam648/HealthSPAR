import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/model/hospital';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css'],
})
export class HospitalDetailsComponent {
  hospitalProfileForm: FormGroup;
  isSubmitted: boolean = false;
  step: number = 1;
  hospitalId:number=0;
  email = localStorage.getItem('email');
  name = localStorage.getItem('name');

  constructor(private formBuilder: FormBuilder, private profileService: HospitalService, private route: Router) {
    this.hospitalProfileForm = this.formBuilder.group({
      basicDetailForm: this.formBuilder.group({
        hospitalName: [this.name, Validators.required],
        hospitalWebsite: [''],
        hospitalEmail: [this.email, [Validators.required, Validators.email]],
        hospitalPhoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        numberOfBeds: 0,
        hospitalAmenities: ['']
      }),
      addressDetailForm: this.formBuilder.group({
        city: this.formBuilder.group({
          name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
          district: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
          state: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
          country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
          zip: [
            '',
            [
              Validators.required,
              Validators.pattern('^[0-9]*$'),
              Validators.minLength(6),
              Validators.maxLength(6),
            ],
          ],
        }),
      }),
      doctorDetailForm: this.formBuilder.array([]),
      questionDetailForm:this.formBuilder.array([])
    });
  }

  get basicDetails() {
    return this.hospitalProfileForm.get('basicDetailForm');
  }
  get addressDetails() {
    return this.hospitalProfileForm.get('addressDetailForm');
  }
  get doctorDetails() {
    return this.hospitalProfileForm.get('doctorDetailForm') as FormArray;
  }
  get questionDetails() {
    return this.hospitalProfileForm.get('questionDetailForm') as FormArray;
  }

  getDoctorFormGroup(index: number) {
    return this.doctorDetails.at(index) as FormGroup;
  }
  
  getQuestionFormGroup(index: number) {
    return this.questionDetails.at(index) as FormGroup;
  }

  onSubmit() {
    this.isSubmitted = true;


    if (this.basicDetails?.invalid && this.step == 1) {
      return
    }

    if (this.addressDetails?.invalid && this.step === 2) {
      return;
    }

    if (this.doctorDetails?.invalid && this.step === 3) {
      return;
    }

    this.step = this.step + 1;


    if (this.step === 5 && this.hospitalProfileForm.valid) {
      console.log("form value: ", this.hospitalProfileForm.value);
      


      const hospitalData: Hospital = {
        hospitalName: this.basicDetails?.get('hospitalName')?.value,
        hospitalWebsite: this.basicDetails?.get('hospitalWebsite')?.value,
        hospitalEmail: this.basicDetails?.get('hospitalEmail')?.value,
        hospitalPhoneNumber: this.basicDetails?.get('hospitalPhoneNumber')?.value,
        hospitalAmenities: this.basicDetails?.get('hospitalAmenities')?.value,
        numberOfBeds: this.basicDetails?.get('numberOfBeds')?.value,
        city: {
          name: this.addressDetails?.get('city.name')?.value,
          district: this.addressDetails?.get('city.district')?.value,
          state: this.addressDetails?.get('city.state')?.value,
          country: this.addressDetails?.get('city.country')?.value,
          zip: this.addressDetails?.get('city.zip')?.value
        },
        doctors: this.doctorDetails.value,
        hospitalId: this.hospitalId,
        hospitalRating: 0,
        hospitalReviews: [],
        frequentlyAskedQuestion: this.questionDetails.value
      }
      console.log("database value: ", hospitalData);


      this.profileService.addHospitalProfile(hospitalData).subscribe(
        (response) => {
          console.log('Hospital added successfully:', response);
          this.getHospitalByEmail(response.hospitalEmail);
          this.route.navigate(['/hospital/dashboard']);
        },
        (error) => {
          console.error('Error adding hospital:', error);
        }
      );
    }
  }

  public getHospitalByEmail(email: string): void {
    this.profileService.getHospitalProfileByEmail(email).subscribe(
      (response) => {
        this.hospitalId = response.hospitalId;
        localStorage.setItem("hospitalId", `${this.hospitalId}`);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  previous() {
    this.step = this.step - 1;
  }

  removeDoctor(index: number) {
    this.doctorDetails.removeAt(index)

  }

  removeQuestion(index: number) {
    this.questionDetails.removeAt(index)

  }

  addDoctor() {
    const newDoctor = this.formBuilder.group(
      {
        doctorName: ['', Validators.required],
        department: ['', Validators.required],
        qualification: ['', Validators.required],
        languagesSpoken: ['', Validators.required],
        yearOfExperience: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        bio: [''],
      }
    );

    this.doctorDetails.push(newDoctor);

  }
  addQuestion() {
    const newQuestion = this.formBuilder.group(
      {
        question: [''],
        answer: [''],
      }
    );

    this.questionDetails.push(newQuestion);
  }
}
