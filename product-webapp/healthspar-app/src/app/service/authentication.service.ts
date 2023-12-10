import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8085/api/v1/auth';

  constructor(private http:HttpClient) { }

  public login(email:string,password:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/authenticate`,{email,password}).pipe(
      tap(
        (response)=>{}
      ),
      catchError(
        (error)=>{
          return throwError(error);
        }
      )
    )
  }

  public signup(name:string,email:string,password:string,role:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,{name,email,password,role}).pipe(
      tap(
        (response)=>{}
      ),
      catchError(
        (error)=>{
          return throwError(error);
        }
      )
    )
  }
}
