// trip-search.component.ts
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, createPlatform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
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
  map!: any;
  center!: any;
  options!: any;
  directionsService!: any;
  directionsRenderer!: any;
  arrivalMarker!: any;
  departureMarker!: any;

  private autocompleteDeparture: any;
  private autocompleteArrival: any;
  private autocompleteDepartureSubscription: Subscription | undefined;
  private autocompleteArrivalSubscription: Subscription | undefined;

  @ViewChild('searchInputDeparture', { static: true }) searchInputDeparture!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrival', { static: true }) searchInputArrival!: ElementRef<HTMLInputElement>;

  constructor(private addressService: AddressService, private formBuilder: FormBuilder, private renderer: Renderer2, private router: Router) { }

  ngOnInit(): void {
    this.searchTripForm = this.formBuilder.group({
      addressDeparture: ['', Validators.required],
      addressArrival: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      passengerNumber: ['', [Validators.required, Validators.max(4)]]
    });
    if (!this.addressService.getUniversityAddress()) {
      this.addressService.callUniversityAddress().pipe(
        tap(() => {
          this.addGoogleMapsScript();
        })
      ).subscribe();
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

    this.center = {
      lat: this.addressService.getUniversityAddress().geometry.location.lat,
      lng: this.addressService.getUniversityAddress().geometry.location.lng
    };

    this.options = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 16,
      maxZoom: 16,
    };

    this.map = new google.maps.Map(document.getElementById('map'), {
      ...this.options,
      center: this.center
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    this.arrivalMarker;
    this.departureMarker;
  }

  private setRoutePolyline() {
    const departure = this.autocompleteDeparture.getPlace();
    const arrival = this.autocompleteArrival.getPlace();

    const origin = this.getPosition(departure);
    const destination = this.getPosition(arrival);

    let request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (response: any, status: any) => {
      this.directionsRenderer.setOptions({
        suppressPolylines: false,
        map: this.map
      });

      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(response);
      }
    })
  }

  private removeRoutePolyline() {
    this.directionsRenderer.setMap(null);
  }

  private centerMap() {
    var bounds = new google.maps.LatLngBounds();

    console.log("departureMarker", this.departureMarker);
    console.log("arrivalMarker", this.arrivalMarker);
    if (this.departureMarker != undefined && this.departureMarker.position) {
      bounds.extend(this.departureMarker.position);
      console.log("departure", this.departureMarker.position);
    }

    if (this.arrivalMarker != undefined && this.arrivalMarker.position) {
      bounds.extend(this.arrivalMarker.position)
      console.log("arrival", this.arrivalMarker.position);
    }

    this.map.fitBounds(bounds);
  }

  private handlePlaceChange(autocomplete: any, otherAutocomplete: any, formControlName: string, otherFormControlName: string) {
    const place = autocomplete.getPlace();
    const otherPlace = otherAutocomplete.getPlace();
    this.removeMarker(formControlName);
    if (place == undefined || place.place_id === undefined) {
      this.removeRoutePolyline();
      this.centerMap();
      return;
    }

    // check if the place is the university address
    const uni = this.addressService.getUniversityAddress();
    // if not set the other address to the university address
    if (place.place_id != uni.place_id) {
      this.searchTripForm.controls[otherFormControlName].setValue(uni.formatted_address);
      otherAutocomplete.set('place', uni);
    } else {
      // if it is the university address, check if the other address is the same
      if (otherPlace && place.place_id == otherPlace.place_id) {
        this.searchTripForm.controls[otherFormControlName].setValue('');
        otherAutocomplete.set('place', undefined);
      }
    }

    this.searchTripForm.controls[formControlName].setValue(place.formatted_address);
    this.setMarker(formControlName, place);
    this.centerMap()

    if (otherPlace != undefined && otherPlace.place_id != undefined)
      this.setRoutePolyline();
  }

  private handleDepartureChange() {
    this.handlePlaceChange(
      this.autocompleteDeparture,
      this.autocompleteArrival,
      'addressDeparture',
      'addressArrival',
    );
  }

  private handleArrivalChange() {
    this.handlePlaceChange(
      this.autocompleteArrival,
      this.autocompleteDeparture,
      'addressArrival',
      'addressDeparture',
    );
  }

  private getPosition(place: any) {
    if (typeof place.geometry.location.lat === 'function') {
      return {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    } else {
      return {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      };
    }
  }

  private setMarker(formControlName: string, place: any) {
    if (formControlName == "addressDeparture") {
      this.departureMarker = new google.maps.Marker({
        map: this.map,
        position: this.getPosition(place)
      })
    } else {
      this.arrivalMarker = new google.maps.Marker({
        map: this.map,
        position: this.getPosition(place)
      })
    }
  }

  private removeMarker(formControlName: string) {
    if (formControlName == "addressDeparture") {
      if (this.departureMarker != undefined)
        this.departureMarker.setMap(null);
      this.departureMarker = undefined;
    } else {
      if (this.arrivalMarker != undefined)
        this.arrivalMarker.setMap(null);
      this.arrivalMarker = undefined;
    }
  }
}
