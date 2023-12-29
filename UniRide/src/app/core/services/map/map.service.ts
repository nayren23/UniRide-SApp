import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { AddressService } from '../address/address.service';
import { __runInitializers } from 'tslib';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: any;
  private directionsService: any;
  private directionsRenderer: any;
  private arrivalMarker: any;
  private departureMarker: any;

  private autocompleteDeparture: any;
  private autocompleteArrival: any;

  constructor(private addressService: AddressService) { }

  addGoogleMapsScript(renderer: Renderer2, Form: FormGroup, searchInputDeparture: ElementRef<HTMLInputElement>, searchInputArrival: ElementRef<HTMLInputElement>) {
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBMreuA5LC2BJ2f-HFPPhYISSIu0mSS2Gs&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeAutoComplete(Form, searchInputDeparture, searchInputArrival);
      this.initializeMap();
    }
    renderer.appendChild(document.head, script);
  }

  addMap(renderer: Renderer2, departureAddress: string, arrivalAddress: string) {
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBMreuA5LC2BJ2f-HFPPhYISSIu0mSS2Gs&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeMap();
      this.setRoutePolylineFromAddresses(departureAddress, arrivalAddress);
    }
    renderer.appendChild(document.head, script);
  }

  private initializeAutoComplete(Form: FormGroup, searchInputDeparture: ElementRef<HTMLInputElement>, searchInputArrival: ElementRef<HTMLInputElement>) {
    this.autocompleteDeparture = new google.maps.places.Autocomplete(
      searchInputDeparture.nativeElement,
      { types: ['geocode'], componentRestrictions: { country: 'fr' } }
    );

    this.autocompleteArrival = new google.maps.places.Autocomplete(
      searchInputArrival.nativeElement,
      { types: ['geocode'], componentRestrictions: { country: 'fr' } }
    );

    // Add listener to handle place changes
    this.autocompleteDeparture.addListener('place_changed', () => this.handlePlaceChange(
      Form,
      this.autocompleteDeparture,
      this.autocompleteArrival,
      'addressDeparture',
      'addressArrival',
    ));

    this.autocompleteArrival.addListener('place_changed', () => this.handlePlaceChange(
      Form,
      this.autocompleteArrival,
      this.autocompleteDeparture,
      'addressArrival',
      'addressDeparture',
    ));
  }

  private initializeMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 16,
      center: {
        lat: this.addressService.getUniversityAddress().geometry.location.lat,
        lng: this.addressService.getUniversityAddress().geometry.location.lng
      },
      streetViewControl: false,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
  }

  private handlePlaceChange(Form: FormGroup, autocomplete: any, otherAutocomplete: any, formControlName: string, otherFormControlName: string) {
    let place = autocomplete.getPlace();
    let otherPlace = otherAutocomplete.getPlace();
    this.removeMarker(formControlName);
    if (place == undefined || place.place_id === undefined) {
      this.removeRoutePolyline();
      if (otherPlace != undefined && otherPlace.place_id != undefined)
        this.centerMap();
      return;
    }

    // check if the place is the university address
    const uni = this.addressService.getUniversityAddress();
    // if not set the other address to the university address
    if (place.place_id != uni.place_id) {
      Form.controls[otherFormControlName].setValue(uni.formatted_address);
      otherAutocomplete.set('place', uni);
    } else {
      // if it is the university address, check if the other address is the same
      if (otherPlace && place.place_id == otherPlace.place_id) {
        Form.controls[otherFormControlName].setValue('');
        otherAutocomplete.set('place', undefined);
      }
    }

    Form.controls[formControlName].setValue(place.formatted_address);
    this.setMarker(formControlName, place);
    this.centerMap()

    place = autocomplete.getPlace();
    otherPlace = otherAutocomplete.getPlace();
    if (place != undefined && place.place_id != undefined && otherPlace != undefined && otherPlace.place_id != undefined)
      this.setRoutePolyline();
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

  private setRoutePolylineFromAddresses(departureAddress: string, arrivalAddress: string) {
    forkJoin({
      departure: this.addressService.getPlaceDetails(departureAddress),
      arrival: this.addressService.getPlaceDetails(arrivalAddress)
    }).subscribe(({ departure, arrival }) => {
      
  
      const origin = this.getPosition(departure);
      const destination = this.getPosition(arrival);

      let request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      };
      
      new google.maps.Marker({
        map: this.map,
        position: origin
      })
      new google.maps.Marker({
        map: this.map,
        position: destination
      })
      
      this.directionsService.route(request, (response: any, status: any) => {
        this.directionsRenderer.setOptions({
          suppressPolylines: false,
          map: this.map
        });
  
        if (status == google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(response);
        }
      });
    });
  
  }

  private removeRoutePolyline() {
    this.directionsRenderer.setMap(null);
  }

  private centerMap() {
    var bounds = new google.maps.LatLngBounds();

    if (this.departureMarker != undefined && this.departureMarker.position) {
      bounds.extend(this.departureMarker.position);
    }

    if (this.arrivalMarker != undefined && this.arrivalMarker.position) {
      bounds.extend(this.arrivalMarker.position)
    }

    this.map.fitBounds(bounds);
    if (this.map.getZoom() > 16) {
      this.map.setZoom(16);
    }
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

  getAutocompleteDeparture() {
    return this.autocompleteDeparture;
  }

  getAutocompleteArrival() {
    return this.autocompleteArrival;
  }
}
