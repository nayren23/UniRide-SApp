import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../app/environements/environement';


@Injectable({
  providedIn: 'root'
})
export class StatisticService {

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

}
