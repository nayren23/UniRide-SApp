import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { TripService } from '../../../core/services/trip/trip.service';
import { AddressService } from '../../../core/services/address/address.service';
import { MapService } from '../../../core/services/map/map.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {
  minDate: Date = new Date();
  tripForm!: FormGroup;
  description: string = " ";

  @ViewChild('searchInputDeparture', { static: true }) searchInputDeparture!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrival', { static: true }) searchInputArrival!: ElementRef<HTMLInputElement>;



  constructor(
    private mapService: MapService,
    private formBuilder: FormBuilder,
    private tripService: TripService,
    private addressService: AddressService,
    private renderer: Renderer2,
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
                timestamp_proposed: this.formattedDate(),
                total_passenger_count: this.tripForm.value.passengerNumber,
              };
              this.tripService.createTrip(tripData).subscribe(
                (tripId) => {
                  this.scrollToSection('map');
                  this.messageService.add({ severity: 'success', summary: 'Trajet créé avec succès' });
                  console.log('Trajet créé avec succès, ID :', tripId);
                },
                (tripError) => {
                  if (tripError.error.message == "INVALID_TIMESTAMP_PROPOSED") {
                    this.scrollToSection('map');
                    this.messageService.add({ severity: 'error', summary: 'La date et/ou l\'heure du trajet sont invalides' });
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
  // Fonction générique pour extraire l'identifiant de la réponse
  private extractIdFromResponse(response: any): any {
    // Adapter cette partie en fonction de la structure réelle de la réponse
    return response.id_address || response.data?.id_address || null;
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
