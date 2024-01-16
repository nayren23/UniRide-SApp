import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Tooltip } from 'primeng/tooltip';
import { tap } from 'rxjs';
import { AddressService } from 'src/app/core/services/address/address.service';
import { MapService } from 'src/app/core/services/map/map.service';
import { TripService } from 'src/app/core/services/trip/trip.service';

@Component({
  selector: 'app-create-daily-trip',
  templateUrl: './create-daily-trip.component.html',
  styleUrls: ['./create-daily-trip.component.css'],
})
export class CreateDailyTripComponent implements OnInit {
  minDate: Date = new Date();
  nbPassenger: number = 1;
  weekDays: any[] = [
    { name: 'Lundi', value: 0 },
    { name: 'Mardi', value: 1 },
    { name: 'Mercredi', value: 2 },
    { name: 'Jeudi', value: 3 },
    { name: 'Vendredi', value: 4 },
    { name: 'Samedi', value: 5 },
    { name: 'Dimanche', value: 6 }
  ]
  tripForm!: FormGroup;
  @ViewChild('searchInputDeparture', { static: true }) searchInputDeparture!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrival', { static: true }) searchInputArrival!: ElementRef<HTMLInputElement>;
  @ViewChild(Tooltip) tooltip!: Tooltip;


  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService,
    private addressService: AddressService,
    private tripService: TripService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.tripForm = this.formBuilder.group({
      addressDeparture: ['', Validators.required],
      addressArrival: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      hour: ['', Validators.required],
      passengerNumber: [1, [Validators.required, Validators.min(1), Validators.max(8)]],
      days: [[], Validators.required] // pour les jours de la semaine
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

  onSubmit() {
    this.messageService.clear();
    if (this.tripForm.valid) {
      // Utilise l'autocomplétion pour obtenir les données de l'address de départ
      const placeDeparture = this.mapService.getAutocompleteDeparture().getPlace();
      const addressDataDeparture = this.addressService.extractAddressData(placeDeparture);

      // Utilise l'autocomplétion pour obtenir les données de l'address d'arrivée
      const placeArrival = this.mapService.getAutocompleteArrival().getPlace();
      const addressDataArrival = this.addressService.extractAddressData(placeArrival);

      this.addressService.createAddress(addressDataDeparture).subscribe(
        (addressResponseDeparture: any) => {
          const addressIdDeparture = this.extractIdFromResponse(addressResponseDeparture);

          this.addressService.createAddress(addressDataArrival).subscribe(
            (addressResponseArrival: any) => {
              const addressIdArrival = this.extractIdFromResponse(addressResponseArrival);

              const tripData = {
                address_departure_id: addressIdDeparture,
                address_arrival_id: addressIdArrival,
                date_start: this.formattedDate(this.tripForm.value.dateStart),
                date_end: this.formattedDate(this.tripForm.value.dateEnd),
                hour: this.formatTime(this.tripForm.value.hour),
                total_passenger_count: this.tripForm.value.passengerNumber,
                days: this.tripForm.value.days
              };
              this.tripService.createTripDaily(tripData).subscribe(
                (tripId) => {
                  this.scrollToSection('map');
                  this.messageService.add({ severity: 'success', summary: 'Trajet créé avec succès' });
                  console.log('Trajet créé avec succès, ID :', tripId);
                },
                (tripError) => {
                  if (tripError.error.message == "INVALID_TIMESTAMP_PROPOSED") {
                    this.scrollToSection('map');
                    this.messageService.add({ severity: 'error', summary: 'La date et/ou l\'heure du trajet sont invalides' });
                  } else if (tripError.error.message == "DATE_START_CANNOT_BE_HIGHER_THAN_DATE_END") {
                    this.scrollToSection('map');
                    this.messageService.add({ severity: 'error', summary: 'La date de début ne peut pas être supérieure à la date de fin' });
                  } else {
                    console.error('Erreur lors de la création du trajet', tripError);
                    this.scrollToSection('map');
                    this.messageService.add({ severity: 'error', summary: 'Une erreur s\'est produite. Veuillez réessayer plus tard.' });
                  }
                }
              );
            },
            (addressErrorArrival: any) => {
              if (addressErrorArrival.error.message == "STREET_NUMBER_CANNOT_BE_NULL") {
                this.scrollToSection('map');
                this.messageService.add({ severity: 'error', summary: 'L\'adresse d\'arrivée n\'est pas valide' });
              } else {
                console.error('Erreur lors de la création du trajet', addressErrorArrival);
                this.scrollToSection('map');
                this.messageService.add({ severity: 'error', summary: 'Une erreur s\'est produite. Veuillez réessayer plus tard.' });
              }
            }
          );
        },
        (addressErrorDeparture: any) => {
          if (addressErrorDeparture.error.message == "STREET_NUMBER_CANNOT_BE_NULL") {
            this.scrollToSection('map');
            this.messageService.add({ severity: 'error', summary: 'L\'adresse de départ n\'est pas valide' });
          } else {
            console.error('Erreur lors de la création du trajet', addressErrorDeparture);
            this.scrollToSection('map');
            this.messageService.add({ severity: 'error', summary: 'Une erreur s\'est produite. Veuillez réessayer plus tard.' });
          }
        }
      );
    }
  }

  private extractIdFromResponse(response: any): any {
    // Adapter cette partie en fonction de la structure réelle de la réponse
    return response.id_address || response.data?.id_address || null;
  }

  private formattedDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajoute un zéro si le mois est < 10
    const day = date.getDate().toString().padStart(2, '0'); // Ajoute un zéro si le jour est < 10

    return `${year}-${month}-${day}`;
  }

  private formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0'); // Ajoute un zéro si l'heure est < 10
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ajoute un zéro si les minutes sont < 10
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Ajoute un zéro si les secondes sont < 10

    return `${hours}:${minutes}:${seconds}`;
  }

  onClick() {
    this.tooltip.activate();
  }

  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
