import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environements/environement';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  getUserIDAndRole(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(
      `${environment.backUrl}/user/role`,
      { headers: headers }
    );
  }

  hasRole(requiredRoles: number[]): boolean {
    if (sessionStorage.getItem("user_r")) {
      let role = Number(sessionStorage.getItem("user_r"));
      return requiredRoles.some(r => r === role);
    }
    return false
  }


  isAuthenticated(): boolean {
    return this.cookieService.get('IsAuthentified') == 'true';
  }

  get isLoggedIn(): Observable<boolean> {
    this.loggedIn.next(this.isAuthenticated())
    return this.loggedIn.asObservable();
  }


  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  getToken(): string {
    return this.cookieService.get("access_token_cookie")
  }

  logout(): Observable<any> {
    return this.http.delete(`${environment.backUrl}/user/logout`).pipe(
      tap(() => {
        sessionStorage.clear();
        this.cookieService.delete('keepLoggedIn');
        this.cookieService.delete('IsAuthentified');
        this.setLoggedIn(false);
        this.router.navigate(['/login']);
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
    this.setLoggedIn(isAuthentified);
    this.cookieService.set('IsAuthentified', isAuthentified.toString());
  }

  logIn(params: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      `${environment.backUrl}/user/auth`,
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
    return this.http.get(`${environment.backUrl}/user/refresh`)
  }

  register(formData: any): Observable<any> {
    const headers = new HttpHeaders({
    });
    return this.http.post(`${environment.backUrl}/user/register`, formData, { headers: headers })
  }
}