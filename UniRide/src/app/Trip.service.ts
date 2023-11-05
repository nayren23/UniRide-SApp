import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'https://127.0.0.1:5050/';

  constructor(private http: HttpClient) { }

  createTrip(tripData: any) {
    return this.http.post(this.apiUrl + '/trip/propose', tripData);
  }
  createAddress(tripaddressData: any) {
    
    return this.http.post(this.apiUrl + 'address/add_trip_addresses', tripaddressData);
  }

}
