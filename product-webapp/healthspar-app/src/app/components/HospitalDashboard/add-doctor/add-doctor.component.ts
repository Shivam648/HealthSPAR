import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  hospitalId: number = 0;
  doctorDetailForm: FormGroup;
  isSubmitted: boolean = false;

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
    this.getHospital();
  }
  
  private getHospital(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");
  
    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);
  
      if (!isNaN(hospitalId)) {
        this.profileService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            this.hospitalId = response.hospitalId;
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
      const newDoctor: Doctor = {
        doctorName: this.doctorDetailForm.value.doctorName,
        department: this.doctorDetailForm.value.department,
        qualification: this.doctorDetailForm.value.qualification,
        languagesSpoken: this.doctorDetailForm.value.languagesSpoken,
        yearOfExperience: this.doctorDetailForm.value.yearOfExperience,
        startTime: new Date(this.doctorDetailForm.value.startTime),
        endTime: new Date(this.doctorDetailForm.value.endTime),
        bio: this.doctorDetailForm.value.bio,
      };

      this.addDoctor(this.hospitalId, newDoctor);
    }
  }

  addDoctor(hospitalId: number, doctor: Doctor): void {
    this.profileService.addDoctor(hospitalId, doctor).subscribe(
      (response) => {
        console.log('Successfully added doctor:', response);
        this.route.navigate(['/hospital/doctors']);
      },
      (error) => {
        console.error("Error while adding doctor ", error);
      }
    );
  }
}
