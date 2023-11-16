// trip-search.component.ts
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TripService } from '../Services/Trip/trip.service';
import { Router } from '@angular/router'; 

declare var google: any;

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.css']
})
export class TripSearchComponent implements OnInit, OnDestroy {
  searchResults: any[] = [];
  searchTripForm!: FormGroup;
  private autocompleteDepart: any;
  private autocompleteArrivee: any;
  private autocompleteDepartSubscription: Subscription | undefined;
  private autocompleteArriveeSubscription: Subscription | undefined;

  @ViewChild('searchInputDepart', { static: true }) searchInputDepart!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrivee', { static: true }) searchInputArrivee!: ElementRef<HTMLInputElement>;

  constructor(private tripService: TripService, private formBuilder: FormBuilder, private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.searchTripForm = this.formBuilder.group({
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

  search() {
    if (this.searchTripForm.valid) {
      // Utilisez les valeurs du formulaire pour la recherche
  

      // Utilise l'autocomplétion pour obtenir les données de l'adresse de départ
      const placeDepart = this.autocompleteDepart.getPlace();
      const addressDataDepart = this.extractAddressData(placeDepart);

      // Utilise l'autocomplétion pour obtenir les données de l'adresse d'arrivée
      const placeArrivee = this.autocompleteArrivee.getPlace();
      const addressDataArrivee = this.extractAddressData(placeArrivee);

    

      const searchData = {
        depart: {
          street_number: addressDataDepart.street_number,
          street_name:addressDataDepart.street_name,
          city: addressDataDepart.city, 
          postal_code : addressDataDepart.postal_code,
          description : addressDataDepart.description
      },
  
      arrival : {
        street_number: addressDataArrivee.street_number,
          street_name:addressDataArrivee.street_name,
          city: addressDataArrivee.city, 
          postal_code : addressDataArrivee.postal_code,
          description : addressDataArrivee.description
      },
  
      trip : {
          passenger_count : this.searchTripForm.value.nombrePassagers,
          departure_date :  this.searchTripForm.value.date + ' ' + this.searchTripForm.value.horaire + ':00'
      }


      }
      console.log("search", searchData)
      // Utilise la fonction searchTrips du service pour rechercher des trajets
      this.tripService.searchTrips(searchData).subscribe(
        (response) => {
          this.searchResults = response.trips;
          this.router.navigate(['/search-results'], { state: { resultData: searchData } });
        },
        (error) => {
          console.error('Erreur lors de la recherche de trajet', error);
        }
      );
    }
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
