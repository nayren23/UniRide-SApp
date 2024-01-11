import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environements/environement';
import { AuthService } from '../auth/auth.service'; // Importez le service d'authentification


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(error: any): Observable<never> {
    console.error(' error:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  getBookOfCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/book/requests`,
      { headers: headers }
    )
  }

  bookTrip(tripId: number, passengerCount: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      `${this.apiUrl}/book`,
      { "trip_id": tripId, "passenger_count": passengerCount },
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  answerBook(tripId: number, bookerId: number, response: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log({ "trip_id": tripId, "booker_id": bookerId, "response": response })
    return this.http.put(
      `${this.apiUrl}/book/respond`,
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
      `${this.apiUrl}/book/${tripId}/code`,
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
      `${this.apiUrl}/book/${tripId}`,
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
      `${this.apiUrl}/book/join`,
      { "trip_id": tripId, "booker_id": userId, "verification_code": code },
      { headers: headers }
    );
  }
}
