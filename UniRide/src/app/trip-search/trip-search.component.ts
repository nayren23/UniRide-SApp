// trip-search.component.ts
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TripService } from '../Services/Trip/trip.service';
import { Router } from '@angular/router';
import { AddressService } from '../Services/address/address.service';

declare var google: any;

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.css']
})
export class TripSearchComponent implements OnInit, OnDestroy {
  searchResults: any[] = [];
  searchTripForm!: FormGroup;
  private autocompleteDeparture: any;
  private autocompleteArrival: any;
  private autocompleteDepartureSubscription: Subscription | undefined;
  private autocompleteArrivalSubscription: Subscription | undefined;

  @ViewChild('searchInputDeparture', { static: true }) searchInputDeparture!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrival', { static: true }) searchInputArrival!: ElementRef<HTMLInputElement>;

  constructor(private tripService: TripService, private addressService: AddressService, private formBuilder: FormBuilder, private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.searchTripForm = this.formBuilder.group({
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
  // trip-search.component.ts

  search() {
    if (this.searchTripForm.valid) {
      const searchParams = {
        depart: this.addressService.extractAddressData(this.autocompleteDeparture.getPlace()),
        arrival: this.addressService.extractAddressData(this.autocompleteArrival.getPlace()),
        trip: {
          passenger_count: this.searchTripForm.value.passengerNumber,
          departure_date: `${this.searchTripForm.value.date} ${this.searchTripForm.value.time}:00`
        }
      };
      this.router.navigate(['/search-results'], { queryParams: { params: JSON.stringify(searchParams) } });
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
    // Initialize autocomplete
    this.autocompleteDeparture = new google.maps.places.Autocomplete(
      this.searchInputDeparture.nativeElement,
      { types: ['geocode'], componentRestrictions: { country: 'fr' } }
    );

    this.autocompleteArrival = new google.maps.places.Autocomplete(
      this.searchInputArrival.nativeElement,
      { types: ['geocode'], componentRestrictions: { country: 'fr' } }
    );

    // Add listener to handle place changes
    this.autocompleteDeparture.addListener('place_changed', () => this.handleDepartureChange());
    this.autocompleteArrival.addListener('place_changed', () => this.handleArrivalChange());
  }

  private handlePlaceChange(autocomplete: any, otherAutocomplete: any, formControlName: string, otherFormControlName: string) {
    const place = autocomplete.getPlace();
    if (!place) return;

    this.searchTripForm.controls[formControlName].setValue(place.formatted_address);

    // check if the place is the university address
    const uni = this.addressService.getUniversityAddress();
    // if not set the other address to the university address
    if (place.place_id != uni.place_id) {
      this.searchTripForm.controls[otherFormControlName].setValue(uni.formatted_address);
      otherAutocomplete.set('place', uni);
    } else {
      // if it is the university address, check if the other address is the same
      const otherPlace = otherAutocomplete.getPlace();
      if (!otherPlace) return;
      if (place.place_id == otherPlace.place_id) {
        this.searchTripForm.controls[otherFormControlName].setValue('');
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
