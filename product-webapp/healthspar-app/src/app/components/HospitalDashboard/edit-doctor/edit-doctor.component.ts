import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { Hospital } from 'src/app/model/hospital';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css'],
})
export class EditDoctorComponent implements OnInit {
  doctorDetailForm: FormGroup;
  isSubmitted: boolean = false;
  hospitalId: number = 0;
  index: number = 0;
  hospital: Hospital = {
    hospitalId: this.hospitalId,
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

  constructor(
    private profileService: HospitalService,
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute
  ) {
    this.doctorDetailForm = this.formBuilder.group({
      doctorName: ['', Validators.required],
      department: ['', Validators.required],
      qualification: ['', Validators.required],
      languagesSpoken: ['', Validators.required],
      yearOfExperience: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      bio: [''],
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.index = +params['index'];
    });
    this.getHospital();
  }
  
  private getHospital(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");
    
    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);
      
      if (!isNaN(hospitalId)) {
        this.profileService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            if (response.hospitalId !== null && this.index !== null) {
              this.getDoctor(response.hospitalId, this.index);
            }
            this.hospital = response;
            this.hospitalId=response.hospitalId;
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

  onSubmit() {
    this.isSubmitted = true;

    if (this.doctorDetailForm.valid) {
      const updatedDoctor: Doctor = this.doctorDetailForm.value;
      this.updateDoctor(this.hospitalId, this.index, updatedDoctor);
    }
  }

  getDoctor(hospitalId: number, index: number): void {
    this.profileService.getDoctorByIndex(hospitalId, index).subscribe(
      (response) => {
        this.populateFormWithDoctor(response);
      },
      (error) => {
        console.error('Error fetching doctor:', error);
      }
    );
  }

  updateDoctor(hospitalId: number, index: number, doctor: Doctor): void {
    this.profileService.updateDoctorByIndex(hospitalId, index, doctor).subscribe(
      (response) => {
        console.log('Updated doctor at index:', index, ':', response);
        this.route.navigate(['/hospital/doctors'])
      },
      (error) => {
        console.error('Error updating doctor:', error);
      }
    );
  }

 

  populateFormWithDoctor(doctorData: Doctor) {
    this.doctorDetailForm.patchValue(doctorData);
  }
}
