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
  private backUrl = environment.backUrl;

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
      `${this.backUrl}/user/driver/infos/${userId}`,
      { headers: headers }
    )
  }

  getUserInfoById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/admin/infos/${userId}`,
      { headers: headers }
    )
  }

  getListUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/admin/users-informations`,
      { headers: headers }
    )
  }

  getInfosUserById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/admin/infos/${userId}`,
      { headers: headers }
    )
  }

  deleteUserById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete(
      `${this.backUrl}/admin/user-management/${userId}`,
      { headers: headers }
    )
  }

  getDriverRanking(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/admin/drivers-ranking`,
      { headers: headers }
    )
  }

  getPassengerRanking(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/admin/passengers-ranking`,
      { headers: headers }
    )
  }

  getActifCriterias(idRole: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${this.backUrl}/admin/actif-criterion/${idRole}`,
      { headers: headers }
    )
  }
}
