import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../app/models/user.model';
import { environment } from '../../environements/environement';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

private get token(): string {
  return this.authService.getToken();
}

getUserInfo(): Observable<User> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  return this.http.get<User>(`${this.apiUrl}/user/infos`, { headers });
}

editUserInfo(field: string, updatedUser: { [key: string]: string }): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  const endpoint = `${this.apiUrl}/user/change/${field.toLowerCase()}`; 
  return this.http.post(endpoint, updatedUser, { headers });
}

}

