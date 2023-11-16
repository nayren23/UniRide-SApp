import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = environment.apiUrl;

  // Utilisation d'un jeton en dur pour les fins de test
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMDE1Mjg0MSwianRpIjoiYzg1ZjgxODAtZjM2MC00ZmUxLWIwZjYtMzE5NTBlM2RmZWI5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NTQsIm5iZiI6MTcwMDE1Mjg0MSwiZXhwIjoxNzAwMTU2NDQxfQ.38vZbLUNXA9E8G0TVYc8Obykgpt_HIKlFL77-NpT5dM';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    console.error('create address error:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  createTrip(tripData: any): Observable<any> {
    // Ajouter le jeton d'accès à l'en-tête d'autorisation
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
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
