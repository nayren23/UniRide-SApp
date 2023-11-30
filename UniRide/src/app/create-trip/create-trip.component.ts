import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TripService } from '../Services/Trip/trip.service';
import { ToastrService } from 'ngx-toastr';

declare var google: any;

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit, OnDestroy {
  createTripForm!: FormGroup;
  description: string = " ";
  addressIdDepart:any;
  addressIdArrivee:any;
  @ViewChild('searchInputDepart', { static: true }) searchInputDepart!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrivee', { static: true }) searchInputArrivee!: ElementRef<HTMLInputElement>;
  private autocompleteDepartSubscription: Subscription | undefined;
  private autocompleteArriveeSubscription: Subscription | undefined;
  private autocompleteDepart: any;
  private autocompleteArrivee: any;



  constructor(
    private formBuilder: FormBuilder,
    private tripService: TripService,
    private renderer: Renderer2,
    private toastr: ToastrService,

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

  ngOnDestroy(): void {
    // Désabonner les observables pour éviter les fuites de mémoire
    if (this.autocompleteDepartSubscription) {
      this.autocompleteDepartSubscription.unsubscribe();
    }

    if (this.autocompleteArriveeSubscription) {
      this.autocompleteArriveeSubscription.unsubscribe();
    }
  }
  onSubmit() {
    if (this.createTripForm.valid) {
        // Utilise l'autocomplétion pour obtenir les données de l'adresse de départ
    const placeDepart = this.autocompleteDepart.getPlace();
    const addressDataDepart = this.extractAddressData(placeDepart);

    // Utilise l'autocomplétion pour obtenir les données de l'adresse d'arrivée
    const placeArrivee = this.autocompleteArrivee.getPlace();
    const addressDataArrivee = this.extractAddressData(placeArrivee);


      console.log("json", JSON.stringify(addressDataDepart));
      this.tripService.createAddress(addressDataDepart).subscribe(
        (addressResponseDepart: any) => {
          this.addressIdDepart = this.extractIdFromResponse(addressResponseDepart);

          this.tripService.createAddress(addressDataArrivee).subscribe(
            (addressResponseArrivee: any) => {
              this.addressIdArrivee = this.extractIdFromResponse(addressResponseArrivee);

              const tripData = {
                address_depart_id: this.addressIdDepart,
                address_arrival_id: this.addressIdArrivee,
                timestamp_proposed: this.createTripForm.value.date + " " +this.createTripForm.value.horaire +":00" ,
                total_passenger_count: this.createTripForm.value.nombrePassagers,
              };
  console.log("trip", tripData)
              this.tripService.createTrip(tripData).subscribe(
                (tripId) => {
                  console.log('Trajet créé avec succès, ID :', tripId);
                  this.toastr.success('Trajet créé avec succès', 'Trajet créé');

                },
                (tripError) => {
                  console.error('Erreur lors de la création du trajet', tripError);
                  this.toastr.error('Erreur lors de la création du trajet', 'Erreur');

                }
              );
            },
            (addressErrorArrivee: any) => {
              console.error('Erreur lors de la création de l\'adresse d\'arrivée', addressErrorArrivee);
              this.toastr.error('Erreur lors de la création de l\'adresse d\'arrivée', 'Erreur');

            }
          );
        },
        (addressErrorDepart: any) => {
          console.error('Erreur lors de la création de l\'adresse de départ', addressErrorDepart);
          this.toastr.error('Erreur lors de la création de l\'adresse de départ', 'Erreur');
        }
      );
    } else {
      console.error('Le formulaire est invalide');
      this.toastr.error('Le formulaire est invalide', 'formulaire est invalide');

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
    // Initialisation l'autocomplétion pour les adresses de départ
    this.autocompleteDepart = new google.maps.places.Autocomplete(
      this.searchInputDepart.nativeElement,
      { types: ['geocode'], componentRestrictions: { country: 'fr' } }
    );

    this.autocompleteArrivee = new google.maps.places.Autocomplete(
      this.searchInputArrivee.nativeElement,
      { types: ['geocode'], componentRestrictions: { country: 'fr' } }
    );

    // Ajout d'un écouteur d'événements pour détecter le changement de lieu
    this.autocompleteDepart.addListener('place_changed', () => {
      const place = this.autocompleteDepart.getPlace();
      const formattedAddress = this.formatAddress(place.address_components);
      this.searchInputDepart.nativeElement.value = formattedAddress;
    });

    this.autocompleteArrivee.addListener('place_changed', () => {
      const place = this.autocompleteArrivee.getPlace();
      const formattedAddress = this.formatAddress(place.address_components);
      this.searchInputArrivee.nativeElement.value = formattedAddress;
    });
  }

  private formatAddress(addressComponents: any): string {
    const street_number = addressComponents.find((component: any) => component.types.includes('street_number'))?.long_name || '';
    const street = addressComponents.find((component: any) => component.types.includes('route'))?.long_name || '';
    const city = addressComponents.find((component: any) => component.types.includes('locality'))?.long_name || '';
    const postal_code = addressComponents.find((component: any) => component.types.includes('postal_code'))?.long_name || '';
    const formattedAddress = `${street_number},${street},${city} ${postal_code}`;
    return formattedAddress;
  }
  private extractAddressData(place: any): any {
    const street_number = place.address_components.find((component: any) => component.types.includes('street_number'))?.long_name || '';
    const street_name = place.address_components.find((component: any) => component.types.includes('route'))?.long_name || '';
    const city = place.address_components.find((component: any) => component.types.includes('locality'))?.long_name || '';
    const postal_code = place.address_components.find((component: any) => component.types.includes('postal_code'))?.long_name || '';
    const description = place.formatted_address || '';

    return {
      street_number: street_number,
      street_name: street_name,
      city: city,
      postal_code: postal_code,
      description: description
    };
  }

}
