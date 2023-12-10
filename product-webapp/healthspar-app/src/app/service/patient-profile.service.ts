import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientProfileService {
  private apiUrl = 'http://localhost:8090';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public addPatientProfile(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient, this.httpOptions);
  }

  public updatePatientProfile(patientId: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients/${patientId}`, patient, this.httpOptions);
  }

  public getPatientProfile(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/id/${patientId}`);
  }

  public getPatientByEmail(email: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/email/${email}`);
  }
}
