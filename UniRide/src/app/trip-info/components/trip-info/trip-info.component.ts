import { Component, Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../../core/services/trip/trip.service';
import { Trip } from '../../../core/models/trip.models';
import { MapService } from '../../../core/services/map/map.service';
import { AddressService } from '../../../core/services/address/address.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Location } from '@angular/common'
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../core/services/book/book.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
    private toastr: ToastrService,
    private authService: AuthService
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
      // message: `Êtes-vous sûr de vouloir réserver ce trajet pour ${this.trip.price}€ ?`,
      message: `Êtes-vous sûr de vouloir réserver ce trajet ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookService.bookTrip(this.trip.id, 1).subscribe({
          next: (data: any) => { this.toastr.success('Demande de réservation envoyée', 'Réservation envoyée'); },
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

  getUserID(): number {
    console.log(this.authService.getUserID())
    console.log(this.trip.driverId)
    return Number(this.authService.getUserID());
  }

  currentUserInTrip(): boolean {
    return !("message" in this.tripService.getTripPassengers(this.trip.id));
  }

}
