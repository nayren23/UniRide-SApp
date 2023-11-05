import { Component } from '@angular/core';
import { TripService } from '../Trip.service'; 


@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent {
    rideData = { 
        adresseDepart: '',
        adresseArrivee: '',
        date: '',
        horaire: '',
        nombrePassagers: 0
    };


    constructor(private tripService: TripService) {}
    
  onSubmit() {
    if (this.rideData.nombrePassagers > 4) {
      // Affichez un message d'erreur ou empêchez la soumission du formulaire
      console.error("Le nombre de passagers ne peut pas dépasser 4.");
      return;
    }

    
  }
}
