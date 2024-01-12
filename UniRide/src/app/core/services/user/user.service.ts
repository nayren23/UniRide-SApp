import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service'; // Importez le service d'authentification
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environements/environement';
import { UserInterface } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserInterface {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(error: any): Observable<never> {
    console.error(' error:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  getUserInfoSummaryById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/user/driver/infos/${userId}`,
      { headers: headers }
    )
  }

  getUserInfoById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/user/infos/${userId}`,
      { headers: headers }
    )
  }

  getListUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/user/users_informations`,
      { headers: headers }
    )
  }

  getInfosUserById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/user/infos/${userId}`,
      { headers: headers }
    )
  }

  deleteUserById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(
      `${this.apiUrl}/user/user_management/${userId}`,
      { headers: headers }
    )
  }

  getDriverRanking(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/user/drivers-ranking`,
      { headers: headers }
    )
  }

  getActifCriterias(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.apiUrl}/user/actif-criterion`,
      { headers: headers }
    )
  }
}
