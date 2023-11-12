import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

 
  createTrip(tripData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}trip/propose`, tripData).pipe(
      map((response: any) => {
        // Utilisez les données de la réponse comme nécessaire
        const tripId = response.trip_id;
        console.log('ID du trajet créé :', tripId);
        return tripId;
      })
    );
  }

  createAddress(tripaddressData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}address/add`, tripaddressData).pipe(
      map((response: any) => {
        // Utilisez les données de la réponse comme nécessaire
        const idAddress = response.id_address;
        console.log('ID de l\'adresse créée :', idAddress);
        return idAddress;
      })
    );
  }
}
