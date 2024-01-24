import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environements/environement';
import { StatisticInterface } from '../../interface/statistic.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticService implements StatisticInterface {

  private backUrl = environment.backUrl;

  constructor(private http: HttpClient) { }

  getNumberOfUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.backUrl}/admin/user-number`,
      { headers: headers }
    )
  }


  getTripsNumber(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.backUrl}/admin/trip-number`,
      { headers: headers }
    )
  }

  getNumberOfDocuments(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.backUrl}/admin/document-number`,
      { headers: headers }
    )
  }

  getStatisticByUserId(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.backUrl}/admin/statistics/${userId}`,
      { headers: headers }
    )
  }

  setOptionsDoughnut() {
    return {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: 'black'
          }
        }
      }
    };
  }
}
