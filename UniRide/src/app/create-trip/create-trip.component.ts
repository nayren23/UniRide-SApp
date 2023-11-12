import { Component, OnInit } from '@angular/core';
import { TripService } from '../Services/Trip/Trip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {
  createTripForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.createTripForm = this.formBuilder.group({
      adresseDepart: ['', Validators.required],
      adresseArrivee: ['', Validators.required],
      date: ['', Validators.required],
      horaire: ['', Validators.required],
      nombrePassagers: ['', [Validators.required, Validators.max(4)]]
    });
  }

  onSubmit() {
    if (this.createTripForm.valid) {
      const tripData = {
        adresseDepart: this.createTripForm.value.adresseDepart,
        adresseArrivee: this.createTripForm.value.adresseArrivee,
        date: this.createTripForm.value.date,
        horaire: this.createTripForm.value.horaire,
        nombrePassagers: this.createTripForm.value.nombrePassagers
      };
      console.log('Données du formulaire :', tripData);
      
      // Appeler le service pour créer l'adresse de départ
      this.tripService.createAddress({ address: tripData.adresseDepart }).subscribe(
        (departAddressResponse) => {
          // Adapter cette partie en fonction de la structure réelle de la réponse
          const departAddressId = this.extractIdFromResponse(departAddressResponse);
  
          // Appeler le service pour créer l'adresse d'arrivée
          this.tripService.createAddress({ address: tripData.adresseArrivee }).subscribe(
            (arriveeAddressResponse) => {
              // Adapter cette partie en fonction de la structure réelle de la réponse
              const arriveeAddressId = this.extractIdFromResponse(arriveeAddressResponse);
  
              // Maintenant, vous avez les IDs des adresses, vous pouvez les utiliser pour créer le trajet
              const tripWithAddresses = {
                adresseDepartId: departAddressId,
                adresseArriveeId: arriveeAddressId,
                date_horaire: tripData.date + ' ' + tripData.horaire + ":00",
                nombrePassagers: tripData.nombrePassagers
              };
  
              // Appeler le service pour créer le trajet
              this.tripService.createTrip(tripWithAddresses).subscribe(
                (tripId) => {
                  // Gérer la réponse du service, par exemple, afficher un message de succès
                  console.log('Trajet créé avec succès, ID :', tripId);
                },
                (tripError) => {
                  // Gérer les erreurs lors de la création du trajet
                  console.error('Erreur lors de la création du trajet', tripError);
                }
              );
            },
            (arriveeAddressError) => {
              // Gérer les erreurs lors de la création de l'adresse d'arrivée
              console.error('Erreur lors de la création de l\'adresse d\'arrivée', arriveeAddressError);
            }
          );
        },
        (departAddressError) => {
          // Gérer les erreurs lors de la création de l'adresse de départ
          console.error('Erreur lors de la création de l\'adresse de départ', departAddressError);
        }
      );
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  // Fonction générique pour extraire l'identifiant de la réponse
  private extractIdFromResponse(response: any): any {
    // Adapter cette partie en fonction de la structure réelle de la réponse
    return response.id_address || response.data?.id_address || null;
  }
}
