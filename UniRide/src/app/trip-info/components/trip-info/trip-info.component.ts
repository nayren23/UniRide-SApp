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

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class TripInfoComponent implements OnInit {

  trip!: Trip;
  userId!: Number;
  isPassenger: boolean = false;
  joined: boolean = false;
  qrCodeValue!: string;
  canStartTrip: boolean = false;
  alreadyBooked: boolean = false;

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
        console.log(this.trip);
        this.renderMap();
        this.currentUserInTrip();
        this.checkCanStartTrip()
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

  getStatusLabel(status?: number): string {
    switch (status) {
      case 1: return 'À Venir';
      case 2: return 'Annulé';
      case 3: return 'Trajet Passé';
      case 4: return 'En Cours';
      default: return 'Inconnu';
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
          next: (data: any) => { this.toastr.success('Demande de réservation envoyée', 'Réservation envoyée'); },
          error: (error: any) => { this.toastr.error('Une erreur s\'est produite', 'Erreur') }
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
          next: (data: any) => { this.toastr.success('Le trajet a commencé', 'Trajet commencé'); },
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
          next: (data: any) => { this.toastr.success('Le trajet est terminé', 'Trajet terminé'); },
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
          next: (data: any) => { this.toastr.success('Le trajet a été annulé', 'Trajet annulé'); },
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
          next: (data: any) => { this.toastr.success('La réservation a été annulée', 'Réservation annulée'); },
          error: (error: any) => { this.toastr.error('Une erreur s\'est produite', 'Erreur') }
        });
      }
    });
  }


  back(): void {
    this.location.back();
  }

  chipValue(status?: number): any {
    switch (status) {
      case 1: return 'primary';
      case 3: return 'warning';
      case 4: return 'success';
      default: return 'danger';
    }
  }

  getUserID(): void {
    this.authService.getUserIDAndRole().subscribe(data => {
      this.userId = data.id;
      this.getTripDetails();
    })
  }

  currentUserInTrip(): void {
    if (this.trip.driverId != this.userId) {
      this.bookService.get_booking(this.trip.id).pipe(
        tap((data: any) => {
          this.alreadyBooked = true;
          this.isPassenger = data.accepted == 1;
          this.joined = data.joined;
          if (!this.joined && this.trip.status == 4)
            this.getCode();
        }
        )).subscribe();
    }
  }

  getCode(): void {
    this.bookService.getCode(this.trip.id).pipe(
      tap((data: any) => {
        console.log(data);
        this.qrCodeValue = `${environment.frontUrl}/validate-passenger?trip-id=${this.trip.id}&user-id=${this.userId}&code=${data.verification_code}`;
      })).subscribe();
  }
}
