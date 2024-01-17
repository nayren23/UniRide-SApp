import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private backUrl = environment.backUrl;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error(' error:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  getBookOfCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/book/requests`,
      { headers: headers }
    )
  }

  bookTrip(tripId: number, passengerCount: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      `${this.backUrl}/book`,
      { "trip_id": tripId, "passenger_count": passengerCount },
      { headers: headers }
    );
  }

  answerBook(tripId: number, bookerId: number, response: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(
      `${this.backUrl}/book/respond`,
      { "trip_id": tripId, "booker_id": bookerId, "response": response },
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  getCode(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/book/${tripId}/code`,
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  get_booking(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/book/${tripId}`,
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  join(tripId: number, userId: number, code: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(
      `${this.backUrl}/book/join`,
      { "trip_id": tripId, "booker_id": userId, "verification_code": code },
      { headers: headers }
    );
  }

  cancelBooking(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(
      `${this.backUrl}/book/${tripId}/cancel`,
      { headers: headers }
    );
  }
}
