import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Doctor } from 'src/app/model/doctor';
import { AppointmentService } from 'src/app/service/appointment.service';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  index: number = 0;
  hospitalId: number = 0;
  doctor: Doctor = {
    doctorName: '',
    department: '',
    qualification: '',
    languagesSpoken: '',
    yearOfExperience: 0,
    startTime: new Date,
    endTime: new Date,
    bio: ''
  }
  appointments: Appointment[] = [];

  onClickEdit(hospitalId: number, index: number): void {
    this.route.navigate(['/hospital/edit-doctor', hospitalId, index]);
  }

  constructor(private hospitalService: HospitalService, private router: ActivatedRoute, private route: Router, private appointmentService: AppointmentService,) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (params) => {
        this.index = +params['index'];
      }
    )
    this.getHospital();
  }

  private getHospital(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");

    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);

      if (!isNaN(hospitalId)) {
        this.hospitalService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            this.getDoctor(response.hospitalId, this.index);
            this.getAppointmentForHospital(response.hospitalId);
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

  getDoctor(hospitalId: number, index: number): void {
    this.hospitalService.getDoctorByIndex(hospitalId, index).subscribe(
      (response) => {
        this.doctor = response
      },
      (error) => {
        console.error('Error fetching doctor:', error);
      }
    );
  }

  public getAppointmentForHospital(hospitalId: number) {
    this.appointmentService.getAppointmentsForHospital(hospitalId).subscribe(
      (response: Appointment[]) => {
        this.appointments = response;
        this.appointments.sort(
          (a, b) => {
            const dateA = new Date(a.dateTime);
            const dateB = new Date(b.dateTime);
            return dateA.getTime() - dateB.getTime();
          }
        )
        console.log(this.appointments);

      }
    )
  }




}
