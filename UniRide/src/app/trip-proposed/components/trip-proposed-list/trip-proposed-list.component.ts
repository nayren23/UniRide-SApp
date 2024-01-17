import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../core/services/trip/trip.service';
import { Trip } from '../../../core/models/trip.models';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-proposed-list',
  templateUrl: './trip-proposed-list.component.html',
  styleUrls: ['./trip-proposed-list.component.css']
})
export class TripProposedListComponent implements OnInit {

  trips: Trip[] = [];
  page!: number;
  totalPage!: number;
  subscriptionComplete: boolean = false;
  loading: boolean = true;

  constructor(private tripService: TripService, private router: Router) { }

  ngOnInit(): void {
    this.tripService.getTripsProposed().subscribe({
      next: (data: any) => {
        this.totalPage = data.totalPages;
        this.page = data.page;
        data.trips.forEach((trip: any) => {
          this.trips.push({
            id: trip.trip_id,
            status: trip.status,
            driverId: trip.driver_id,
            departure: {
              id: trip.address.departure.id,
              name: trip.address.departure.name,
            },
            arrival: {
              id: trip.address.arrival.id,
              name: trip.address.arrival.name,
            },
            price: trip.price,
            proposedDate: new Date(trip.proposed_date),
          });
        });
      },
      complete: () => {
        this.trips = [...this.trips]
        this.loading = false;
        console.log(this.trips);
      }
    });
  }

  goToTripDetails(trip_id: number) {
    console.log(trip_id)
    this.router.navigate([`/trips/${trip_id}`]);
  }

  getStatus(status: number): string {
    switch (status) {
      case 1: return 'À Venir';
      case 2: return 'Annulé';
      case 3: return 'Trajet Passé';
      case 4: return 'En Cours';
      default: return 'Inconnu';
    }
  }

  getSeverity(status: number): string {
    switch (status) {
      case 1: return 'primary';
      case 3: return 'warning';
      case 4: return 'success';
      default: return 'danger';
    }
  }
}
