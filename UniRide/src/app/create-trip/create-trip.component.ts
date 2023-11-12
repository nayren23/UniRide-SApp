import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../Services/Trip/Trip.service';


declare var google: any;

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {
  createTripForm!: FormGroup;
  @ViewChild('searchInputDepart') searchInputDepart!: ElementRef;
  @ViewChild('searchInputArrivee') searchInputArrivee!: ElementRef;


  constructor(
    private formBuilder: FormBuilder,
    private tripService: TripService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.createTripForm = this.formBuilder.group({
      adresseDepart: ['', Validators.required],
      adresseArrivee: ['', Validators.required],
      date: ['', Validators.required],
      horaire: ['', Validators.required],
      nombrePassagers: ['', [Validators.required, Validators.max(4)]]
    });
    this.addGoogleMapsScript();
  }
  onSubmit() {
    if (this.createTripForm.valid) {
      const tripData = {
        adresseDepart: this.searchInputDepart, // Utilisez la propriété sélectionnée pour l'adresse de départ
        adresseArrivee: this.searchInputArrivee, // Utilisez la propriété sélectionnée pour l'adresse d'arrivée
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

  private addGoogleMapsScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBMreuA5LC2BJ2f-HFPPhYISSIu0mSS2Gs&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.handleGoogleMapsLoad();
    this.renderer.appendChild(document.head, script);
  }

  private handleGoogleMapsLoad() {
    const autocompleteDepart = new google.maps.places.Autocomplete(this.searchInputDepart.nativeElement, {
      types: ['geocode'],
      componentRestrictions: { country: 'fr' }
    });

    autocompleteDepart.addListener('place_changed', () => {
      const place = autocompleteDepart.getPlace();
      this.searchInputDepart = place.formatted_address;
    });

    const autocompleteArrivee = new google.maps.places.Autocomplete(this.searchInputArrivee.nativeElement, {
      types: ['geocode'],
      componentRestrictions: { country: 'fr' }
    });

    autocompleteArrivee.addListener('place_changed', () => {
      const place = autocompleteArrivee.getPlace();
      this.searchInputArrivee = place.formatted_address;
    });
  }
}
