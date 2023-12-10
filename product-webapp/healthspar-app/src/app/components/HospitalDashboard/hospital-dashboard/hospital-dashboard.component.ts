import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Hospital } from 'src/app/model/hospital';
import { AppointmentService } from 'src/app/service/appointment.service';
import { HospitalService } from 'src/app/service/hospital.service';

@Component({
  selector: 'app-hospital-dashboard',
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.css'],
})
export class HospitalDashboardComponent implements OnInit {
  appointments: Appointment[] = [];
  todayAppointments: Appointment[] = [];
  hospitalId: number = 0;
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
  @ViewChild('tableBody') tableBody?: ElementRef<any>;
  selectedValue = 'All';

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.getHospital();
    this.filterTodayAppointments();
  }
  
  private getHospital(): void {
    const hospitalIdString = localStorage.getItem("hospitalId");
    
    if (hospitalIdString !== null) {
      const hospitalId = parseInt(hospitalIdString, 10);
      
      if (!isNaN(hospitalId)) {
        this.hospitalService.getHospitalProfile(hospitalId).subscribe(
          (response) => {
            this.hospital = response;
            this.getAppointmentForHospital(response.hospitalId);
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

  private getAppointmentForHospital(hospitalId: number) {
    this.appointmentService.getAppointmentsForHospital(hospitalId).subscribe(
      (response: Appointment[]) => {
        this.appointments = response;
        this.appointments.sort(
          (a, b) => {
            const dateA = new Date(a.dateTime);
            const dateB = new Date(b.dateTime);
            return dateA.getTime() - dateB.getTime();
          }
        );
        console.log(this.appointments);
      },
      (error) => {
        console.error("Error fetching appointments:", error);
      }
    );
  }

  getUniquePatientCount(): number {
    const uniquePatientNames = new Set<string>();
    this.appointments.forEach((appointment) => {
      uniquePatientNames.add(appointment.email);
    });
    return uniquePatientNames.size;
  }

  filterAppointmentsByStatus(status: string): number {
    return this.appointments.filter((appointment) => appointment.status === status).length;
  }

  filterTodayAppointments() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.todayAppointments = this.appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.dateTime);
      return appointmentDate.getTime() >= today.getTime() && appointmentDate.getTime() < today.getTime() + 24 * 60 * 60 * 1000;
    });
    console.log("Today's appointments:", this.todayAppointments);
  }

  onViewClick(): void {
    this.router.navigate(['/hospital/appointment']);
  }
}
