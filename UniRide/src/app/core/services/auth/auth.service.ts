import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environements/environement';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  getUserIDAndRole(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${environment.apiUrl}/user/role`,
      { headers: headers }
    );
  }

  isAuthenticated(): boolean {
    return this.cookieService.get('IsAuthentified') == 'true';
  }

  logout(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/user/logout`).pipe(
      tap(() => {
        console.log('logout');
        this.cookieService.delete('keepLoggedIn');
        this.cookieService.delete('IsAuthentified');
        this.router.navigate(['/logIn']);
      }
      ));
  }

  setKeepLoggedIn(params: any): void {
    this.cookieService.set('keepLoggedIn', params.keepLoggedIn.toString());
  }

  getKeepLoggedIn(): boolean {
    return this.cookieService.get('keepLoggedIn') == 'true';
  }

  setIsAuthentified(isAuthentified: boolean): void {
    this.cookieService.set('IsAuthentified', isAuthentified.toString());
  }

  logIn(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      `${environment.apiUrl}/user/auth`,
      {
        login: params.login,
        password: params.password,
        keepLoggedIn: params.keepLoggedIn
      },
      {
        headers: headers
      }
    ).pipe(
      tap((response: any) => {
        this.setKeepLoggedIn(params);
      }));
  }

  refreshToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${environment.apiUrl}/user/refresh`)
  }
}