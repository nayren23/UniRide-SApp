import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TripService } from '../Services/Trip/Trip.service'; 
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit{
  @ViewChild('addressText') addressText!: ElementRef;
  protected placeSubscription!: Subscription;

    rideData = { 
        date: '',
        horaire: '',
        nombrePassagers: 0
    };

    dataAddress={
      adresseDepart: '',
      adresseArrivee: ''
    }


    constructor(
      private tripService: TripService,
      ) {}

    
  onSubmit() {
    if (this.rideData.nombrePassagers > 4) {
      // Affichez un message d'erreur ou empêchez la soumission du formulaire
      console.error("Le nombre de passagers ne peut pas dépasser 4.");
    }

    this.tripService.createAddress
    
    // Création de l'objet de données pour l'adresse
    const tripAddressData = {
      adresseDepart: this.dataAddress.adresseDepart,
      adresseArrivee: this.dataAddress.adresseArrivee
    };

    // Appel au service pour créer l'adresse
    this.tripService.createAddress(tripAddressData).subscribe(
      (addressResponse) => {
        console.log('Adresse créée avec succès', addressResponse);
        const tripAddressData = {
          adresseDepart: this.dataAddress.adresseDepart,
          adresseArrivee: this.dataAddress.adresseArrivee
        };
      
        this.tripService.createAddress(tripAddressData).subscribe(
          (addressResponse: any) => {
            console.log('Adresse créée avec succès', addressResponse);
      
            const tripData = {
              ...this.rideData,
              addressId: addressResponse.id
            };
      
            this.tripService.createTrip(tripData).subscribe(
              (tripResponse: any) => {
                console.log('Trajet créé avec succès', tripResponse);
              },
              (error) => {
                console.error('Erreur lors de la création du trajet', error);
              }
            );
          },
          (error) => {
            console.error('Erreur lors de la création de l\'adresse', error);
          }
        );
  });
}

  ngOnInit(): void {
    // Le code à exécuter lors de l'initialisation du composant
  }
}
