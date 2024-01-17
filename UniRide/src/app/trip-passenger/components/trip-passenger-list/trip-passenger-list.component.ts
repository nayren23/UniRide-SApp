import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripSummary } from 'src/app/core/models/trip-summary.model';
import { TripService } from 'src/app/core/services/trip/trip.service';

@Component({
  selector: 'app-trip-passenger-list',
  templateUrl: './trip-passenger-list.component.html',
  styleUrls: ['./trip-passenger-list.component.css']
})
export class TripPassengerListComponent implements OnInit {
  trips: TripSummary[] = [];
  loading: boolean = true;

  constructor(
    private tripService: TripService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTrips()
  }

  getTrips(): void {
    this.tripService.getTripsPassenger().subscribe(
      {
        next: (trips: any) => {
          trips.forEach((trip: any) => {
            this.trips.push(
              {
                id: trip.trip_id,
                departure_address: trip.departure_address,
                arrival_address: trip.arrival_address,
                departure_date: new Date(trip.proposed_date),
                status: trip.status, // 1 2 3 4
                book_status: trip.book_status // -1 0 1
              }
            )
          })
        },
        complete: () => {
          this.trips = [...this.trips]
          this.loading = false;
        }
      }
    )
  }

  getStatus(status: number, book_status: number): string {
    if (book_status == -1)
      return "refusé"
    if (status == 2)
      return "trajet annulé"
    if (book_status == 0)
      return "sans réponse"
    switch (status) {
      case 3:
        return "trajet passé";
      case 4:
        return "en cours"
      case 1:
        return "accepté"
      default:
        return "inconnu"
    }
  }

  convertToFrenchDate(date: Date) {
    return date.toLocaleString('fr-FR', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  }

  getSeverity(status: string): string {
    switch (status) {
      case "refusé": return "danger";
      case "trajet annulé": return "danger";
      case "en cours": return "success";
      case "accepté": return "success";
      case "trajet passé": return "warning";
      case "sans réponse": return "info";
      default: return "primary";
    }
  }

  goToTripDetails(trip_id: number) {
    this.router.navigate([`/trips/${trip_id}`]);
  }
}
