import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../app/models/user.model';
import { Car } from '../../../app/models/car.model';
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

editUserInfo(field: keyof User, updatedValue: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  const endpoint = `${this.apiUrl}/user/change/${field.toLowerCase()}`;
  const updatedUser = { [field]: updatedValue };
  
  return this.http.post(endpoint, updatedUser, { headers });
}

addCar(car: Car): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  return this.http.post(`${this.apiUrl}/car/add`, car, { headers });
}

updateCar(car: Car): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  return this.http.put(`${this.apiUrl}/car/update`, car, { headers });
}

getCarInformation(): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` 
  });

  return this.http.get<any>(`${this.apiUrl}/car/info`, { headers });
}
}

