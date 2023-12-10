import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/patient/home/home.component';
import { HospitalComponent } from './components/patient/hospital/hospital.component';
import { HospitalDetailsComponent } from './components/hospital/hospital-details/hospital-details.component';
import { HospitalPageComponent } from './components/hospital/hospital-page/hospital-page.component';
import { ProfileComponent } from './components/patient/profile/profile.component';
import { UpdateProfileComponent } from './components/patient/update-profile/update-profile.component';
import { LoginComponent } from './components/shared/login/login.component';

import { UpdateHospitalDetailsComponent } from './components/hospital/update-hospital-details/update-hospital-details.component';
import { DisplayHospitalDetailsComponent } from './components/hospital/display-hospital-details/display-hospital-details.component';
import { AppointmentComponent } from './components/patient/appointment/appointment.component';
import { RescheduleAppointmentComponent } from './components/patient/reschedule-appointment/reschedule-appointment.component';
import { AppointmentsListComponent } from './components/hospital/appointments-list/appointments-list.component';
import { RescheduleHospitalAppointmentComponent } from './components/hospital/reschedule-hospital-appointment/reschedule-hospital-appointment.component';
import { HospitalDashboardComponent } from './components/HospitalDashboard/hospital-dashboard/hospital-dashboard.component';
import { DoctorsListComponent } from './components/hospital/doctors-list/doctors-list.component';
import { AddDoctorComponent } from './components/HospitalDashboard/add-doctor/add-doctor.component';
import { DoctorComponent } from './components/hospital/doctor/doctor.component';
import { EditDoctorComponent } from './components/HospitalDashboard/edit-doctor/edit-doctor.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HospitalRegisterComponent } from './components/shared/hospital-register/hospital-register.component';
import { HospitalDashboardHomeComponent } from './components/HospitalDashboard/hospital-dashboard-home/hospital-dashboard-home.component';
import { RecommendationComponent } from './components/patient/recommendation/recommendation.component';

import { PatientHomeComponent } from './components/PatientDashboard/patient-home/patient-home.component';
import { AuthGuard } from './Authentication/auth.guard';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

const routes: Routes = [
  // common routes
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'patient-login', component: LoginComponent },
  { path: 'hospital-login', component: HospitalRegisterComponent },

  // patient routes
  {
    path: 'patient',
    component: HomeComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: '/index', pathMatch: 'full' },
      { path: 'index', component: RecommendationComponent },
      { path: 'hospital-page/:id', component: HospitalPageComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'reschedule/:id', component: RescheduleAppointmentComponent },
      { path: 'display', component: PatientHomeComponent },
      { path: 'update', component: UpdateProfileComponent },
      { path: 'hospital', component: HospitalComponent },
    ],
    canActivate: [AuthGuard],
  },

  // hospital routes
  {
    path: 'hospital',
    component: HospitalDashboardHomeComponent,
    children: [
      { path: 'profile', component: HospitalDetailsComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HospitalDashboardComponent },
      { path: 'appointment', component: AppointmentsListComponent },
      {
        path: 'reschedule/:id',
        component: RescheduleHospitalAppointmentComponent,
      },
      { path: 'display', component: DisplayHospitalDetailsComponent },
      { path: 'update', component: UpdateHospitalDetailsComponent },
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'add-doctor', component: AddDoctorComponent },
      { path: 'edit-doctor/:index', component: EditDoctorComponent },
      { path: 'doctor/:index', component: DoctorComponent },
    ],
    canActivate: [AuthGuard],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
