import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { TripService } from '../services/trip/trip.service';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../services/address/address.service';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {
  createTripForm!: FormGroup;
  description: string = " ";

  @ViewChild('searchInputDeparture', { static: true }) searchInputDeparture!: ElementRef<HTMLInputElement>;
  @ViewChild('searchInputArrival', { static: true }) searchInputArrival!: ElementRef<HTMLInputElement>;



  constructor(
    private mapService: MapService,
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
    if (!this.addressService.getUniversityAddress()) {
      this.addressService.callUniversityAddress().pipe(
        tap(() => {
          this.mapService.addGoogleMapsScript(this.renderer, this.createTripForm, this.searchInputDeparture, this.searchInputArrival)
        })
      ).subscribe();
    } else {
      this.mapService.addGoogleMapsScript(this.renderer, this.createTripForm, this.searchInputDeparture, this.searchInputArrival)
    }
  }

  onSubmit() {
    if (this.createTripForm.valid) {
      // Utilise l'autocomplétion pour obtenir les données de l'address de départ
      const placeDeparture = this.mapService.getAutocompleteDeparture().getPlace();
      const addressDataDeparture = this.addressService.extractAddressData(placeDeparture);

      // Utilise l'autocomplétion pour obtenir les données de l'address d'arrivée
      const placeArrival = this.mapService.getAutocompleteArrival().getPlace();
      const addressDataArrival = this.addressService.extractAddressData(placeArrival);


      console.log("json", JSON.stringify(addressDataDeparture));
      this.addressService.createAddress(addressDataDeparture).subscribe(
        (addressResponseDeparture: any) => {
          const addressIdDeparture = this.extractIdFromResponse(addressResponseDeparture);

          this.addressService.createAddress(addressDataArrival).subscribe(
            (addressResponseArrival: any) => {
              const addressIdArrival = this.extractIdFromResponse(addressResponseArrival);

              const tripData = {
                address_departure_id: addressIdDeparture,
                address_arrival_id: addressIdArrival,
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
}
