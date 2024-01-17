import { Component, Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../../core/services/trip/trip.service';
import { Trip } from '../../../core/models/trip.models';
import { MapService } from '../../../core/services/map/map.service';
import { AddressService } from '../../../core/services/address/address.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common'
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../../core/services/book/book.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environements/environement';
import { Book } from 'src/app/core/models/book.models';


@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class TripInfoComponent implements OnInit {

  trip!: Trip;
  userId!: Number;
  qrCodeValue!: string;
  canStartTrip: boolean = false;
  book: Book = {
    passenger_count: 0,
    accepted: 0,
    joined: false,
  };
  alreadyBooked: boolean = false;
  msgs: any[] = [];
  severity!: string;
  label!: string;

  constructor(
    private tripService: TripService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private mapService: MapService,
    private addressService: AddressService,
    private renderer: Renderer2,
    private confirmationService: ConfirmationService,
    private location: Location,
    private toastr: ToastrService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getUserID();
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
        this.currentUserInTrip();
        this.checkCanStartTrip()
        this.setStatusLabel();
        this.setSeverity();
      })).subscribe()
  }

  checkCanStartTrip(): void {
    if (this.userId == this.trip.driverId && this.trip.status == 1) {
      const fifteenMinutes = 15 * 60 * 1000;
      const difference = Math.abs(new Date().getTime() - new Date(this.trip.proposedDate).getTime());
      this.canStartTrip = difference <= fifteenMinutes;
    }
  }

  renderMap(): void {

    this.addressService.callUniversityAddress().pipe(
      tap(() => {
        this.mapService.addMap(this.renderer, this.trip.departure.name, this.trip.arrival.name)
      })
    ).subscribe();
  }

  setStatusLabel(): void {
    switch (this.trip.status) {
      case 1: this.label = 'À Venir'; break;
      case 2: this.label = 'Annulé'; break;
      case 3: this.label = 'Trajet Passé'; break;
      case 4: this.label = 'En Cours'; break;
      default: this.label = 'Inconnu';
    }
  }

  setSeverity(): void {
    switch (this.trip.status) {
      case 1: this.severity = 'primary'; break;
      case 3: this.severity = 'warning'; break;
      case 4: this.severity = 'success'; break;
      default: this.severity = 'danger';
    }
  }

  bookTrip() {
    this.confirmationService.confirm({
      // message: `Êtes-vous sûr de vouloir réserver ce trajet pour ${this.trip.price}€ ?`,
      message: `Êtes-vous sûr de vouloir réserver ce trajet ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookService.bookTrip(this.trip.id, 1).subscribe({
          next: (data: any) => {
            this.toastr.success('Demande de réservation envoyée', 'Réservation envoyée');
            this.book.accepted = 0;
            this.displayBookingStatus();
            this.alreadyBooked = true;
          },
          error: (error: any) => {
            if (error.error.message == "BOOKED_TOO_MANY_TIMES")
              this.toastr.error('Vous avez réservé ce trajet trop de fois !', 'Réservation impossible')
            else
              this.toastr.error('Une erreur s\'est produite', 'Erreur')
          }
        });
      }
    });
  }

  startTrip() {
    this.confirmationService.confirm({
      // message: `Êtes-vous sûr de vouloir réserver ce trajet pour ${this.trip.price}€ ?`,
      message: `Êtes-vous sûr de vouloir commencer ce trajet ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tripService.startTrip(this.trip.id).subscribe({
          next: (data: any) => {
            this.toastr.success('Le trajet a commencé', 'Trajet commencé');
            this.trip.status = 4;
            this.setStatusLabel();
            this.setSeverity();
          },
          error: (error: any) => { this.toastr.error('Une erreur s\'est produite', 'Erreur') }
        });
      }
    });
  }

  endTrip() {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir terminer ce trajet ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tripService.endTrip(this.trip.id).subscribe({
          next: (data: any) => {
            this.toastr.success('Le trajet est terminé', 'Trajet terminé');
            this.trip.status = 3;
            this.setStatusLabel();
            this.setSeverity();
          },
          error: (error: any) => { this.toastr.error('Une erreur s\'est produite', 'Erreur') }
        });
      }
    });
  }


  cancelTrip() {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir annuler ce trajet ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tripService.cancelTrip(this.trip.id).subscribe({
          next: (data: any) => {
            this.toastr.success('Le trajet a été annulé', 'Trajet annulé');
            this.trip.status = 2;
            this.setStatusLabel();
            this.setSeverity();
          },
          error: (error: any) => { this.toastr.error('Une erreur s\'est produite', 'Erreur') }
        });
      }
    });
  }


  cancelBooking() {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir annuler votre réservation ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookService.cancelBooking(this.trip.id).subscribe({
          next: (data: any) => {
            this.toastr.success('La réservation a été annulée', 'Réservation annulée');
            this.book.accepted = -2;
            this.displayBookingStatus();
          },
          error: (error: any) => { this.toastr.error('Une erreur s\'est produite', 'Erreur') }
        });
      }
    });
  }


  back(): void {
    this.location.back();
  }

  currentUserInTrip(): void {
    if (this.trip.driverId != this.userId) {
      this.bookService.get_booking(this.trip.id).pipe(
        tap((data: any) => {
          this.book = data;
          this.alreadyBooked = true;
          this.displayBookingStatus();
          if (!this.book.joined && this.trip.status == 4)
            this.getCode();
        }
        )).subscribe();
    }
  }

  getUserID(): void {
    this.userId = Number(sessionStorage.getItem("user_id"))
    this.getTripDetails()
  }
  
  displayBookingStatus(): void {
    this.messageService.clear();
    if (this.trip.status != 1 && this.book.accepted == 0) {

    }
    switch (this.book.accepted) {
      case -2: this.messageService.add({ severity: 'error', summary: 'Réservation annulée' }); break;
      case -1: this.messageService.add({ severity: 'error', summary: 'Réservation refusée' }); break;
      case 0:
        if (this.trip.status == 1)
          this.messageService.add({ severity: 'info', summary: 'Réservation en attente' });
        else
          this.messageService.add({ severity: 'error', summary: 'Réservation refusée' });
        break;
      case 1: this.messageService.add({ severity: 'success', summary: 'Réservation acceptée' }); break;
    }
  }

  getCode(): void {
    this.bookService.getCode(this.trip.id).pipe(
      tap((data: any) => {
        this.qrCodeValue = `${environment.frontUrl}/validate-passenger?trip-id=${this.trip.id}&user-id=${this.userId}&code=${data.verification_code}`;
      })).subscribe();
  }
}
