// trip-search-result-list.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../core/services/trip/trip.service';
import { tap } from 'rxjs';
import { Trip } from '../core/models/trip.models';

@Component({
  selector: 'app-trip-search-result-list',
  templateUrl: './trip-search-result-list.component.html',
  styleUrls: ['./trip-search-result-list.component.css']
})
export class TripSearchResultListComponent implements OnInit {

  searchResults: Trip[] = [];
  subscriptionComplete: boolean = false;

  constructor(private tripService: TripService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap((params: any) => {
        this.tripService.searchTrips(params["params"]).pipe(
          tap((data: any) => {
            console.log('data:', data)
            data.trips.forEach((trip: any) => {
              this.searchResults.push({
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

            });
            this.trierParDistance();
            console.log('searchResults:', this.searchResults);
          }),
        ).subscribe(() => this.subscriptionComplete = true);
      }),
    ).subscribe();
  }

  trierParDistance(): void {
    this.searchResults.sort((a, b) => {
      if (a.distance == undefined || b.distance == undefined) {
        return 0; // or some other logic to handle undefined cases
      }
      return a.distance - b.distance;
    });
  }
}
