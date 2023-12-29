import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../app/environements/environement';
import { CookieService } from 'ngx-cookie-service';
import { registry } from 'chart.js';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  setToken(token: string): void {
    this.cookieService.set('authToken', token);
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('login');
    this.cookieService.delete('password');
    this.cookieService.delete('keepLoggedIn');
  }

  setKeepLoggedIn(params: any): void {
    this.cookieService.set('keepLoggedIn', params.keepLoggedIn.toString());
    this.cookieService.set('login', params.login);
    this.cookieService.set('password', params.password);
  }

  getKeepLoggedIn(): boolean {
    return this.cookieService.get('keepLoggedIn') == 'true';
  }

  logIn(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      `${environment.apiUrl}/user/auth`,
      {
        login: params.login,
        password: params.password
      },
      { headers: headers }
    ).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        if (params.keepLoggedIn)
          this.setKeepLoggedIn(params);
      }));
  }

  refreshToken(): Observable<any> {
    return this.logIn({
      login: this.cookieService.get('login'),
      password: this.cookieService.get('password'),
    });
  }
}