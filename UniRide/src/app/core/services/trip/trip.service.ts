import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environements/environement';
import { AuthService } from '../auth/auth.service'; // Importez le service d'authentification


@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private get token(): string {
    return this.authService.getToken();
  }

  private handleError(error: any): Observable<never> {
    console.error(' error:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  createTrip(tripData: any): Observable<any> {
    // Ajouter le jeton d'accès à l'en-tête d'autorisation
    console.log(this.token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Effectuer la requête HTTP avec l'en-tête d'autorisation
    return this.http.post(
      `${this.apiUrl}/trip/propose`,
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
      `${this.apiUrl}/trip`,
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
      `${this.apiUrl}/trip/driver/current?page=${page}`,
      { headers: headers }
    )
  }
  getTripById(tripId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/trip/${tripId}`,
      { headers: headers }
    )
  }
  getTripPassengers(tripId: number): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/trip/${tripId}/passengers`,
      { headers: headers }
    )
  }
}
