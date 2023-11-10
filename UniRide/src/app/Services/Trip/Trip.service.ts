import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createTrip(tripData: any) {
    return this.http.post(this.apiUrl + '/trip/propose', tripData);
  }
  createAddress(tripaddressData: any) {
    
    return this.http.post(this.apiUrl + 'address/add', tripaddressData);
  }

}
