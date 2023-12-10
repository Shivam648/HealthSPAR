import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/model/hospital';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-update-hospital-details',
  templateUrl: './update-hospital-details.component.html',
  styleUrls: ['./update-hospital-details.component.css'],
})
export class UpdateHospitalDetailsComponent implements OnInit {
  hospital: Hospital = {
    hospitalId: 0,
    hospitalName: '',
    hospitalWebsite: '',
    hospitalEmail: '',
    hospitalPhoneNumber: '',
    hospitalRating: 0,
    hospitalReviews: [],
    hospitalAmenities: '',
    numberOfBeds: 0,
    city: {
      name: '',
      district: '',
      state: '',
      country: '',
      zip: ''
    },
    doctors: [],
    frequentlyAskedQuestion: []
  };

  hospitalProfileForm: FormGroup;
  isSubmitted: boolean = false;
  step: number = 1;

  constructor(
    private profileService: HospitalService,
    private formBuilder: FormBuilder,
    private route: Router
    ,private router:ActivatedRoute
  ) {
    this.hospitalProfileForm = this.formBuilder.group({
      basicDetailForm: this.formBuilder.group({
        hospitalName: ['', Validators.required],
        hospitalWebsite: [''],
        hospitalEmail: ['', [Validators.required, Validators.email]],
        hospitalPhoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        numberOfBeds: [0],
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
  ngOnInit(): void {
    this.getHospitals();
  }
  
  private getHospitals(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");
    
    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);
      
      if (!isNaN(hospitalId)) {
        this.profileService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            this.getHospital(response.hospitalId);
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
    

    if (this.step < 4) {
      this.step += 1;
    }

    if (this.step === 4 && this.hospitalProfileForm.valid) {
      console.log("form value: ", this.hospitalProfileForm.value);
      const hospitalData: Hospital = {
        hospitalId: this.hospital.hospitalId,
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
        hospitalRating: 0,
        hospitalReviews: [],
        frequentlyAskedQuestion: this.questionDetails.value
      }
      console.log("database value : ",hospitalData);
      

      this.updateHospital(hospitalData.hospitalId, hospitalData);

    }
  }

  public getHospital(hospitalId: number): void {
    this.profileService.getHospitalProfile(hospitalId).subscribe(
      (response) => {
        this.hospital = response;
        this.hospitalProfileForm.patchValue({
          basicDetailForm: {
            hospitalName: this.hospital.hospitalName,
            hospitalWebsite: this.hospital.hospitalWebsite,
            hospitalEmail: this.hospital.hospitalEmail,
            hospitalPhoneNumber: this.hospital.hospitalPhoneNumber,
            numberOfBeds: this.hospital.numberOfBeds,
            hospitalAmenities: this.hospital.hospitalAmenities,
          },
          addressDetailForm: {
            city: {
              name: this.hospital.city.name,
              district: this.hospital.city.district,
              state: this.hospital.city.state,
              country: this.hospital.city.country,
              zip: this.hospital.city.zip,
            }
          }
        });

        const doctorsFormArray = this.hospitalProfileForm.get(
          'doctorDetailForm'
        ) as FormArray;

        while (doctorsFormArray.length > 0) {
          doctorsFormArray.removeAt(0);
        }

        for (const doctor of this.hospital.doctors) {
          const doctorFormGroup = this.formBuilder.group({
            doctorName: [doctor.doctorName, Validators.required],
            department: [doctor.department, Validators.required],
            qualification: [doctor.qualification, Validators.required],
            languagesSpoken: [doctor.languagesSpoken, Validators.required],
            yearOfExperience: [doctor.yearOfExperience, Validators.required],
            startTime: [doctor.startTime, Validators.required],
            endTime: [doctor.endTime, Validators.required],
            bio: [doctor.bio],
          });

          doctorsFormArray.push(doctorFormGroup);
        }

        const questionFormArray = this.hospitalProfileForm.get(
          'questionDetailForm'
        ) as FormArray;

        while (questionFormArray.length > 0) {
          questionFormArray.removeAt(0);
        }

        for (const askedQuestion of this.hospital.frequentlyAskedQuestion) {
          const questionFormGroup = this.formBuilder.group({
            question: [askedQuestion.question],
            answer: [askedQuestion.answer]
          });

          questionFormArray.push(questionFormGroup);
        }
      },
      (error) => {
        console.error('Error fetching patient:', error);
      }
    );
  }

  public updateHospital(hospitalId: number, hospital: Hospital): void {
    this.profileService
      .updateHospitalProfile(hospitalId,hospital)
      .subscribe(
        (response: Hospital) => {
          console.log('Hospital profile updated successfully: ', response);
          this.route.navigate(['hospital/display']);
        },
        (error) => {
          console.error('Error updating hospital profile:', error);
        }
      );
  }

  removeDoctor(index: number) {
    this.doctorDetails.removeAt(index)

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



  previous() {
    this.step = this.step - 1;
  }
}
