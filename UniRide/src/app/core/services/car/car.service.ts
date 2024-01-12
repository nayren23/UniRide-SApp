import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../../core/models/car.model'
import { environment } from '../../../../environements/environement';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  addCar(car: Car): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  
    });
  
    return this.http.post(`${this.apiUrl}/car/add`, car, { headers });
  }
  
  updateCar(car: Car): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  
    });
  
    return this.http.put(`${this.apiUrl}/car/update`, car, { headers });
  }
  
  getCarInformation(): Observable<Car> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
  
    });
  
    return this.http.get<Car>(`${this.apiUrl}/car/info`, { headers });
  }
}
