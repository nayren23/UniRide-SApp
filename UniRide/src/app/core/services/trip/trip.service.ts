import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environements/environement';
import { AuthService } from '../auth/auth.service'; // Importez le service d'authentification


@Injectable({
  providedIn: 'root'
})
export class TripService {

  private backUrl = environment.backUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(error: any): Observable<never> {
    console.error(' error:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  createTrip(tripData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Effectuer la requête HTTP avec l'en-tête d'autorisation
    return this.http.post(
      `${this.backUrl}/trip/propose`,
      JSON.stringify(tripData),
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }


  createTripDaily(tripData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Effectuer la requête HTTP avec l'en-tête d'autorisation
    return this.http.post(
      `${this.backUrl}/trip/daily-trip`,
      JSON.stringify(tripData),
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  searchTrips(searchParams: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(
      `${this.backUrl}/trip`,
      searchParams,
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  getTripsProposed(page: number = 1): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/trip/driver/current?page=${page}`,
      { headers: headers }
    )
  }
  getTripById(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/trip/${tripId}`,
      { headers: headers }
    )
  }
  getTripPassengers(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/trip/${tripId}/passengers`,
      { headers: headers }
    )
  }

  getTripsPassenger(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/trip/passenger/current`,
      { headers: headers }
    )
  }

  startTrip(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(
      `${this.backUrl}/trip/${tripId}/start`,
      {},
      { headers: headers }
    )
  }

  endTrip(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(
      `${this.backUrl}/trip/${tripId}/end`,
      {},
      { headers: headers }
    )
  }

  cancelTrip(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(
      `${this.backUrl}/trip/${tripId}/cancel`,
      {},
      { headers: headers }
    )
  }
}
