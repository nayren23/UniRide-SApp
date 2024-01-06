import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environements/environement';
import { StatisticInterface } from '../../interface/statistic.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticService implements StatisticInterface {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNumberOfUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.apiUrl}/user/user_number`,
      { headers: headers }
    )
  }


  getTripsNumber(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.apiUrl}/trip/trip_number`,
      { headers: headers }
    )
  }

  getNumberOfDocuments(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.apiUrl}/user/document_number`,
      { headers: headers }
    )
  }

  getStatisticByUserId(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.apiUrl}/user/statistics/${userId}`,
      { headers: headers }
    )
  }


}
