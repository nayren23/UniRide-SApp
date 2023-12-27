import { Component, Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../services/trip/trip.service';
import { Trip } from '../models/trip.models';
import { MapService } from '../services/map/map.service';
import { AddressService } from '../services/address/address.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Location } from '@angular/common'
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../services/book/book.service';


@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class TripInfoComponent implements OnInit {

  trip!: Trip;

  constructor(
    private tripService: TripService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private mapService: MapService,
    private addressService: AddressService,
    private renderer: Renderer2,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getTripDetails();
  }

  getTripDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.tripService.getTripById(id).pipe(
      tap((data: any) => {
        this.trip = {
          id: data.trip_id,
          driverId: data.driver_id,
          price: data.price,
          departure: {
            id: data.address.departure.id,
            name: data.address.departure.address_name
          },
          arrival: {
            id: data.address.arrival.id,
            name: data.address.arrival.address_name
          },
          proposedDate: data.departure_date,
          numberOfPassenger: data.passenger_count ?? 0,
          status: data.status,
          totalNumberOfPassenger: data.total_passenger_count,
          arrivalDate: data.arrival_date
        };
        this.renderMap();
      })).subscribe()
  }

  renderMap(): void {

    this.addressService.callUniversityAddress().pipe(
      tap(() => {
        this.mapService.addMap(this.renderer, this.trip.departure.name, this.trip.arrival.name)
      })
    ).subscribe();
  }

  getStatusLabel(status?: number): string {
    switch (status) {
      case 1: return 'À Venir';
      case 2: return 'Annulé';
      case 3: return 'Trajet Passé';
      case 4: return 'En Cours';
      default: return 'Inconnu';
    }
  }

  confirm1() {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir réserver ce trajet pour ${this.trip.price}€ ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookService.bookTrip(this.trip.id, 1).subscribe({
          next: (data: any) => { this.toastr.success('Trajet créé avec succès', 'Trajet créé'); },
          error: (error: any) => { this.toastr.error('Une erreur s\'est produite', 'Erreur') }
        });
      }
    });
  }

  back(): void {
    this.location.back();
  }

  chipValue(status?: number): any {
    status = 1;
    switch (status) {
      case 1: return 'primary';
      case 3: return 'success';
      case 4: return 'warning';
      default: return 'danger';
    }
  }

}
