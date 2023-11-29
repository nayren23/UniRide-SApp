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
      zoom: 16
    };

    this.map = new google.maps.Map(document.getElementById('map'), {
      ...this.options,
      center: this.center
    });

    this.map.addListener('zoom_changed', () => {
      let maxZoom = 16; // Set this to your preferred max zoom level
      if (this.map.getZoom() > maxZoom) {
        this.map.setZoom(maxZoom);
      }
    })

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: true
    });
    this.arrivalMarker = new google.maps.Marker({
      map: this.map,
    });
    this.departureMarker = new google.maps.Marker({
      map: this.map,
    });
  }

  setRoutePolyline() {
    const departure = this.autocompleteDeparture.getPlace();
    const arrival = this.autocompleteArrival.getPlace();
    let origin;
    let destination;

    if (typeof departure.geometry.location.lat === 'function') {
      origin = {
        lat: departure.geometry.location.lat(),
        lng: departure.geometry.location.lng()
      };
    } else {
      origin = {
        lat: departure.geometry.location.lat,
        lng: departure.geometry.location.lng
      };
    }
    if (typeof arrival.geometry.location.lat === 'function') {
      destination = {
        lat: arrival.geometry.location.lat(),
        lng: arrival.geometry.location.lng()
      };
    } else {
      destination = {
        lat: arrival.geometry.location.lat,
        lng: arrival.geometry.location.lng
      };
    }
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
  private handlePlaceChange(autocomplete: any, otherAutocomplete: any, formControlName: string, otherFormControlName: string, marker: any) {
    const place = autocomplete.getPlace();
    console.log("place", place);
    if (!place || place.place_id === undefined) return;

    this.searchTripForm.controls[formControlName].setValue(place.formatted_address);
    if (typeof place.geometry.location.lat === 'function') {
      marker.setPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    } else {
      marker.setPosition({
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      });
    }
    var bounds = new google.maps.LatLngBounds();

    if (this.arrivalMarker.position) bounds.extend(this.arrivalMarker.position)
    if (this.departureMarker.position) bounds.extend(this.departureMarker.position)

    this.map.fitBounds(bounds);

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
    console.log("departure", this.autocompleteDeparture.getPlace());
    console.log("arrival", this.autocompleteArrival.getPlace());
    if (this.autocompleteDeparture.getPlace() && this.autocompleteArrival.getPlace()) {
      this.setRoutePolyline();
    }
  }
  private handleDepartureChange() {
    this.handlePlaceChange(
      this.autocompleteDeparture,
      this.autocompleteArrival,
      'addressDeparture',
      'addressArrival',
      this.departureMarker,
    );
  }

  private handleArrivalChange() {
    this.handlePlaceChange(
      this.autocompleteArrival,
      this.autocompleteDeparture,
      'addressArrival',
      'addressDeparture',
      this.arrivalMarker,
    );
  }
}
