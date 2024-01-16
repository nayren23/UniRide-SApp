// trip-search-result-list.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../core/services/trip/trip.service';
import { tap } from 'rxjs';
import { Trip } from '../../../core/models/trip.models';

@Component({
  selector: 'app-trip-search-result-list',
  templateUrl: './trip-search-result-list.component.html',
  styleUrls: ['./trip-search-result-list.component.css']
})
export class TripSearchResultListComponent implements OnInit {

  trips: Trip[] = [];
  loading: boolean = true;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params: any) => {
        this.tripService.searchTrips(params["params"]).subscribe({
          next: (data: any) => {
            data.trips.forEach((trip: any) => {
              this.trips.push({
                id: trip.trip_id,
                driverId: trip.driver,
                departure: {
                  id: trip.address.departure.id,
                  name: trip.address.departure.address_name,
                  longitude: trip.address.departure.longitude,
                  latitude: trip.address.departure.latitude,
                },
                arrival: {
                  id: trip.address.arrival.id,
                  name: trip.address.arrival.address_name,
                  longitude: trip.address.arrival.longitude,
                  latitude: trip.address.arrival.latitude,
                },
                price: trip.price,
                proposedDate: new Date(trip.proposed_date),
                numberOfPassenger: trip.total_passenger_count,
                distance: trip.address.distance,
              });
            })
          },
          complete: () => {
            this.trierParDistance();
            this.trips = [...this.trips]
            this.loading = false;
            console.log('trips:', this.trips);
          }
        });
      }),
    ).subscribe();
  }

  trierParDistance(): void {
    this.trips.sort((a, b) => {
      if (a.distance == undefined || b.distance == undefined) {
        return 0;
      }
      return a.distance - b.distance;
    });
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

  goToTripDetails(trip_id: number) {
    console.log(trip_id)
    this.router.navigate([`/trips/${trip_id}`]);
  }
}
