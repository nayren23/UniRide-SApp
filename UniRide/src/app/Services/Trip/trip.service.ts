import { LogInComponent } from 'src/app/log-in/log-in.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service'; // Importez le service d'authentification


@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient, private authService: AuthService) {}

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
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    // Effectuer la requête HTTP avec l'en-tête d'autorisation
    return this.http.post(
      `${this.apiUrl}trip/propose`,
      JSON.stringify(tripData),
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
    searchTrips(searchData: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.post(
        `${this.apiUrl}trips`,
        JSON.stringify(searchData),
        { headers: headers }
      ).pipe(
        catchError(this.handleError)
      );
    }


  createAddress(addressData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(
      `${this.apiUrl}address/add`,
      JSON.stringify(addressData),
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
}
