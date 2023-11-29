import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TripService } from '../Services/Trip/trip.service';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../Services/address/address.service';

declare var google: any;

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit, OnDestroy {
  createTripForm!: FormGroup;
  description: string = " ";
  addressIdDeparture: any;
  addressIdArrival: any;
  @ViewChild('searchInputDeparture', { static: true }) searchInputDeparture!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrival', { static: true }) searchInputArrival!: ElementRef<HTMLInputElement>;
  private autocompleteDepartureSubscription: Subscription | undefined;
  private autocompleteArrivalSubscription: Subscription | undefined;
  private autocompleteDeparture: any;
  private autocompleteArrival: any;



  constructor(
    private formBuilder: FormBuilder,
    private tripService: TripService,
    private addressService: AddressService,
    private renderer: Renderer2,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.createTripForm = this.formBuilder.group({
      addressDeparture: ['', Validators.required],
      addressArrival: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      passengerNumber: ['', [Validators.required, Validators.max(4)]]
    });
    this.addGoogleMapsScript();
    if (!this.addressService.getUniversityAddress()) {
      this.addressService.callUniversityAddress().subscribe();
    }
  }

  ngOnDestroy(): void {
    // Désabonner les observables pour éviter les fuites de mémoire
    if (this.autocompleteDepartureSubscription) {
      this.autocompleteDepartureSubscription.unsubscribe();
    }

    if (this.autocompleteArrivalSubscription) {
      this.autocompleteArrivalSubscription.unsubscribe();
    }
  }
  onSubmit() {
    if (this.createTripForm.valid) {
      // Utilise l'autocomplétion pour obtenir les données de l'address de départ
      const placeDeparture = this.autocompleteDeparture.getPlace();
      const addressDataDeparture = this.addressService.extractAddressData(placeDeparture);

      // Utilise l'autocomplétion pour obtenir les données de l'address d'arrivée
      const placeArrival = this.autocompleteArrival.getPlace();
      const addressDataArrival = this.addressService.extractAddressData(placeArrival);


      console.log("json", JSON.stringify(addressDataDeparture));
      this.addressService.createAddress(addressDataDeparture).subscribe(
        (addressResponseDeparture: any) => {
          this.addressIdDeparture = this.extractIdFromResponse(addressResponseDeparture);

          this.addressService.createAddress(addressDataArrival).subscribe(
            (addressResponseArrival: any) => {
              this.addressIdArrival = this.extractIdFromResponse(addressResponseArrival);

              const tripData = {
                address_depart_id: this.addressIdDeparture,
                address_arrival_id: this.addressIdArrival,
                timestamp_proposed: this.createTripForm.value.date + " " + this.createTripForm.value.time + ":00",
                total_passenger_count: this.createTripForm.value.passengerNumber,
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
            (addressErrorArrival: any) => {
              console.error('Erreur lors de la création de l\'address d\'arrivée', addressErrorArrival);
              this.toastr.error('Erreur lors de la création de l\'address d\'arrivée', 'Erreur');

            }
          );
        },
        (addressErrorDeparture: any) => {
          console.error('Erreur lors de la création de l\'address de départ', addressErrorDeparture);
          this.toastr.error('Erreur lors de la création de l\'address de départ', 'Erreur');
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
    // Initialisation l'autocomplétion pour les addresss de départ
    this.autocompleteDeparture = new google.maps.places.Autocomplete(
      this.searchInputDeparture.nativeElement,
      { types: ['geocode'], componentRestrictions: { country: 'fr' } }
    );

    this.autocompleteArrival = new google.maps.places.Autocomplete(
      this.searchInputArrival.nativeElement,
      { types: ['geocode'], componentRestrictions: { country: 'fr' } }
    );

    // Ajout d'un écouteur d'événements pour détecter le changement de lieu
    this.autocompleteDeparture.addListener('place_changed', () => this.handleDepartureChange());
    this.autocompleteArrival.addListener('place_changed', () => this.handleArrivalChange());
  }

  private handlePlaceChange(autocomplete: any, otherAutocomplete: any, formControlName: string, otherFormControlName: string) {
    const place = autocomplete.getPlace();
    if (!place) return;

    this.createTripForm.controls[formControlName].setValue(place.formatted_address);

    // check if the place is the university address
    const uni = this.addressService.getUniversityAddress();
    // if not set the other address to the university address
    if (place.place_id != uni.place_id) {
      this.createTripForm.controls[otherFormControlName].setValue(uni.formatted_address);
      otherAutocomplete.set('place', uni);
    } else {
      // if it is the university address, check if the other address is the same
      const otherPlace = otherAutocomplete.getPlace();
      if (!otherPlace) return;
      if (place.place_id == otherPlace.place_id) {
        this.createTripForm.controls[otherFormControlName].setValue('');
        otherAutocomplete.set('place', undefined);
      }
    }
  }
  private handleDepartureChange() {
    this.handlePlaceChange(
      this.autocompleteDeparture,
      this.autocompleteArrival,
      'addressDeparture',
      'addressArrival'
    );
  }

  private handleArrivalChange() {
    this.handlePlaceChange(
      this.autocompleteArrival,
      this.autocompleteDeparture,
      'addressArrival',
      'addressDeparture'
    );
  }
}
