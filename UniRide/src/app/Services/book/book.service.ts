import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../app/environements/environement';
import { AuthService } from '../auth/auth.service'; // Importez le service d'authentification


@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  private get token(): string {
    return this.authService.getToken();
  }

  private handleError(error: any): Observable<never> {
    console.error(' error:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  getBookOfCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(
      `${this.apiUrl}/book/requests`,
      { headers: headers }
    )
  }

  bookTrip(trip_id: number, passenger_count: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(
      `${this.apiUrl}/book`,
      {"trip_id": trip_id,"passenger_count": passenger_count},
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
  
  answerBook(trip_id: number, booker_id: number, response: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    console.log({"trip_id": trip_id,"booker_id": booker_id, "response": response})
    return this.http.post(
      `${this.apiUrl}/book/respond`,
      {"trip_id": trip_id,"booker_id": booker_id, "response": response},
      { headers: headers }
    ).pipe(
      catchError(this.handleError)
    );
  }
}
