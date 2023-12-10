import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/model/hospital';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
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
  dbImage:string='http://localhost:8070/api/v1/hospital/get/doctor/image/';
  

  constructor(
    private hospitalService: HospitalService,
    private route: Router,
    private router:ActivatedRoute,
  
  ) {
  }

  ngOnInit(): void {
    this.getHospital();
  }

  private getHospital(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");
  
    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);
  
      if (!isNaN(hospitalId)) {
        this.hospitalService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            this.hospital = response;
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

  

  onEditClick(index:number): void {
    this.route.navigate(['/hospital/edit-doctor',index]);
  }

  removeDoctor(index:number):void{
    if(index>=0 && index<this.hospital.doctors.length){
      const isConfirmed = window.confirm('Are you sure you want to remove this doctor?');
      if(isConfirmed){
        this.hospital.doctors.splice(index,1);
        this.hospitalService.updateHospitalProfile(this.hospital.hospitalId,this.hospital).subscribe(
          (response: Hospital) => {
            console.log('Doctor removed successfully:', response);
          },
          (error) => {
            console.error('Error removing doctor:', error);
          }
        );
      }
    }
  }

  onClickDoctor(index:number): void {
    this.route.navigate(['/hospital/doctor',index]);
  }
  

}