import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from '../model/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8084';

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public createOrder(order:OrderRequest):Observable<OrderRequest>{
    return this.http.post<OrderRequest>(`${this.apiUrl}/pg/createOrder`,order,this.httpOptions)
  }

}
