// trip-search.component.ts
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AddressService } from '../Services/address/address.service';
import { MapService } from '../Services/map/map.service';

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.css']
})
export class TripSearchComponent implements OnInit {
  searchResults: any[] = [];
  searchTripForm!: FormGroup;

  @ViewChild('searchInputDeparture', { static: true }) searchInputDeparture!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrival', { static: true }) searchInputArrival!: ElementRef<HTMLInputElement>;

  constructor(
    private mapService: MapService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router
  ) { }

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
          this.mapService.addGoogleMapsScript(this.renderer, this.searchTripForm, this.searchInputDeparture, this.searchInputArrival)
        })
      ).subscribe();
    } else {
      this.mapService.addGoogleMapsScript(this.renderer, this.searchTripForm, this.searchInputDeparture, this.searchInputArrival)
    }
  }

  search() {
    if (this.searchTripForm.valid) {
      const searchParams = {
        departure: this.addressService.extractAddressData(this.mapService.getAutocompleteDeparture().getPlace()),
        arrival: this.addressService.extractAddressData(this.mapService.getAutocompleteArrival().getPlace()),
        trip: {
          passenger_count: this.searchTripForm.value.passengerNumber,
          departure_date: `${this.searchTripForm.value.date} ${this.searchTripForm.value.time}:00`
        }
      };
      this.router.navigate(['/search-results'], { queryParams: { params: JSON.stringify(searchParams) } });
    }
  }
}
