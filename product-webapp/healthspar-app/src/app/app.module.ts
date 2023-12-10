import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HospitalComponent } from './components/patient/hospital/hospital.component';
import { AppointmentComponent } from './components/patient/appointment/appointment.component';
import { AboutComponent } from './components/shared/about/about.component';
import { ContactComponent } from './components/shared/contact/contact.component';
import { DashboardComponent } from './components/hospital/dashboard/dashboard.component';
import { DoctorComponent } from './components/hospital/doctor/doctor.component';
import { NavbarComponent } from './components/patient/shared/navbar/navbar.component';
import { HeroComponent } from './components/patient/hero/hero.component';
import { RecommendationComponent } from './components/patient/recommendation/recommendation.component';
import { HomeComponent } from './components/patient/home/home.component';
import { HospitalDetailsComponent } from './components/hospital/hospital-details/hospital-details.component';
import { ProfileComponent } from './components/patient/profile/profile.component';
import { UpdateProfileComponent } from './components/patient/update-profile/update-profile.component';
// import { SidenavComponent } from './components/patient/sidenav/sidenav.component';
import { HospitalSidenavComponent } from './components/hospital/shared/hospital-sidenav/hospital-sidenav.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/shared/login/login.component';
import { SignupComponent } from './components/shared/signup/signup.component';
import { UpdateHospitalDetailsComponent } from './components/hospital/update-hospital-details/update-hospital-details.component';
import { DisplayProfileComponent } from './components/patient/display-profile/display-profile.component';
import { HospitalPageComponent } from './components/hospital/hospital-page/hospital-page.component';
import { DisplayHospitalDetailsComponent } from './components/hospital/display-hospital-details/display-hospital-details.component';
import { RescheduleAppointmentComponent } from './components/patient/reschedule-appointment/reschedule-appointment.component';
import { AppointmentsListComponent } from './components/hospital/appointments-list/appointments-list.component';
import { RescheduleHospitalAppointmentComponent } from './components/hospital/reschedule-hospital-appointment/reschedule-hospital-appointment.component';
import { HcpDSidebarComponent } from './components/HospitalDashboard/hcp-d-sidebar/hcp-d-sidebar.component';
import { HcpDHeaderComponent } from './components/HospitalDashboard/hcp-d-header/hcp-d-header.component';
import { HospitalDashboardComponent } from './components/HospitalDashboard/hospital-dashboard/hospital-dashboard.component';
import { DoctorsListComponent } from './components/hospital/doctors-list/doctors-list.component';
import { AddDoctorComponent } from './components/HospitalDashboard/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './components/HospitalDashboard/edit-doctor/edit-doctor.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HospitalRegisterComponent } from './components/shared/hospital-register/hospital-register.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HospitalDashboardHomeComponent } from './components/HospitalDashboard/hospital-dashboard-home/hospital-dashboard-home.component';
import { SidenavComponent } from './components/patient/sidenav/sidenav.component';
import { PatientSidenavComponent } from './components/PatientDashboard/patient-sidenav/patient-sidenav.component';
import { PatientHomeComponent } from './components/PatientDashboard/patient-home/patient-home.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HospitalComponent,
    AppointmentComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    DoctorComponent,
    NavbarComponent,
    HeroComponent,
    HospitalComponent,
    HomeComponent,
    LoginComponent,
    RecommendationComponent,
    HospitalDetailsComponent,
    ProfileComponent,
    UpdateProfileComponent,
    // SidenavComponent,
    HospitalSidenavComponent,
    SignupComponent,
    LoginComponent,
    HospitalPageComponent,
    UpdateHospitalDetailsComponent,
    DisplayProfileComponent,
    DisplayHospitalDetailsComponent,
    RescheduleAppointmentComponent,
    AppointmentsListComponent,
    RescheduleHospitalAppointmentComponent,
    HospitalDashboardComponent,
    HcpDSidebarComponent,
    HcpDHeaderComponent,
    DoctorsListComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    HomePageComponent,
    HospitalRegisterComponent,
    PageNotFoundComponent,
    HospitalDashboardHomeComponent,
    SidenavComponent,
    PatientSidenavComponent,
    PatientHomeComponent,
    HospitalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserModule,
    // FontAwesomeModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
