// trip-search.component.ts
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AddressService } from '../../../core/services/address/address.service';
import { MapService } from '../../../core/services/map/map.service';
import { TripService } from 'src/app/core/services/trip/trip.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html',
  styleUrls: ['./trip-search.component.css']
})
export class TripSearchComponent implements OnInit {
  minDate: Date = new Date();
  searchResults: any[] = [];
  tripForm!: FormGroup;

  @ViewChild('searchInputDeparture', { static: true }) searchInputDeparture!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrival', { static: true }) searchInputArrival!: ElementRef<HTMLInputElement>;

  constructor(
    private mapService: MapService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private tripService: TripService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      addressDeparture: ['', Validators.required],
      addressArrival: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      passengerNumber: ['', [Validators.required, Validators.max(4)]]
    });
    if (!this.addressService.getUniversityAddress()) {
      this.addressService.callUniversityAddress().pipe(
        tap(() => {
          this.mapService.addGoogleMapsScript(this.renderer, this.tripForm, this.searchInputDeparture, this.searchInputArrival)
        })
      ).subscribe();
    } else {
      this.mapService.addGoogleMapsScript(this.renderer, this.tripForm, this.searchInputDeparture, this.searchInputArrival)
    }
  }

  search() {
    if (this.tripForm.valid) {
      const searchParams = {
        departure: this.addressService.extractAddressData(this.mapService.getAutocompleteDeparture().getPlace()),
        arrival: this.addressService.extractAddressData(this.mapService.getAutocompleteArrival().getPlace()),
        trip: {
          passenger_count: this.tripForm.value.passengerNumber,
          departure_date: this.formattedDate()
        }
      };
      this.tripService.searchTrips(searchParams).subscribe({
        next: (data: any) => {
          this.router.navigate(['/trips/search/results'], { queryParams: { params: JSON.stringify(searchParams) } });
        },
        error: (error: any) => {
          if (error.error.message == "INVALID_TIMESTAMP_PROPOSED") {
            this.scrollToSection('map');
            this.messageService.add({ severity: 'error', summary: 'La date et/ou l\'heure du trajet sont invalides' });
          } else if (error.error.message == "STREET_NUMBER_CANNOT_BE_NULL") {
            this.scrollToSection('map');
            this.messageService.add({ severity: 'error', summary: 'Les adresses ne sont invalides' });
          } else {
            console.error('Erreur lors de la création du trajet', error);
            this.scrollToSection('map');
            this.messageService.add({ severity: 'error', summary: 'Une erreur s\'est produite. Veuillez réessayer plus tard.' });
          }
        }
      })

    }
  }

  private formattedDate(): string {
    const date = new Date(this.tripForm.value.date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajoute un zéro si le mois est < 10
    const day = date.getDate().toString().padStart(2, '0'); // Ajoute un zéro si le jour est < 10

    const time = new Date(this.tripForm.value.time);
    const hours = time.getHours().toString().padStart(2, '0'); // Ajoute un zéro si l'heure est < 10
    const minutes = time.getMinutes().toString().padStart(2, '0'); // Ajoute un zéro si les minutes sont < 10
    const seconds = time.getSeconds().toString().padStart(2, '0'); // Ajoute un zéro si les secondes sont < 10

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
