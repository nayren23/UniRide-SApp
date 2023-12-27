import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service'; // Importez le service d'authentification
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../app/environements/environement';
import { UserInterface } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserInterface {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private get token(): string {
    return this.authService.getToken();
  }

  private handleError(error: any): Observable<never> {
    console.error(' error:', error);
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  getUserInfoSummaryById(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(
      `${this.apiUrl}/user/driver/infos/${userId}`,
      { headers: headers }
    )
  }

  /**
   * This method is used to get the list of users for the admin
   * @returns list of users
   */
  getInfosUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(
      `${this.apiUrl}/users_informations`,
      { headers: headers }
    )
  }

}
