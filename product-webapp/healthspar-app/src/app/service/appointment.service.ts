import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl='http://localhost:8023';


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public addAppointment(appointment:Appointment):Observable<Appointment>{
    return this.http.post<Appointment>(`${this.apiUrl}/appointments`,appointment,this.httpOptions)
  }

  public rescheduleAppointment(appointmentId:number,appointment:Appointment):Observable<Appointment>{
    return this.http.put<Appointment>(`${this.apiUrl}/appointments/reschedule/${appointmentId}`,appointment,this.httpOptions)
  }
  
  public confirmAppointment(appointmentId:number):Observable<Appointment>{
    return this.http.put<Appointment>(`${this.apiUrl}/appointments/confirm/${appointmentId}`,this.httpOptions)
  }

  public cancelAppointment(appointmentId:number):Observable<Appointment>{
    return this.http.delete<Appointment>(`${this.apiUrl}/appointments/cancel/${appointmentId}`)
  }

  public getAppointmentsForPatient(patientId:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/patient/${patientId}`);
  }
  public getAppointmentsForHospital(hospitaLId:number):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/hospital/${hospitaLId}`);
  }
 
  public getAppointmentsbyId(appointmentId:number):Observable<Appointment>{
    return this.http.get<Appointment>(`${this.apiUrl}/appointments/${appointmentId}`);
  }
}