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
    return of([
      {
        "arrival_address": "140 Rue de la Nouvelle France Montreuil 93100",
        "departure_address": "8 Rue d'Amsterdam Paris 75008",
        "id": 1,
        "book_status": 1,
        "status": 1,
        "proposed_date": "2023-12-06 16:20:00"
      },
      {
        "arrival_address": "8 Rue d'Amsterdam Paris 75008",
        "departure_address": "140 Rue de la Nouvelle France Montreuil 93100",
        "id": 16,
        "book_status": 1,
        "status": 4,
        "proposed_date": "2023-12-03 09:20:00"
      }
    ]);
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
