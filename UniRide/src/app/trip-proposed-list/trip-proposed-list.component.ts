import { Component, OnInit } from '@angular/core';
import { TripService } from '../Services/trip/trip.service';
import { Trip } from '../models/trip.models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-trip-proposed-list',
  templateUrl: './trip-proposed-list.component.html',
  styleUrls: ['./trip-proposed-list.component.css']
})
export class TripProposedListComponent implements OnInit {

  tripsProposed: Trip[] = [];
  page!: number;
  totalPage!: number;
  subscriptionComplete: boolean = false;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.getTripsProposed().pipe(
      tap((data: any) => {
        this.totalPage = data.totalPages;
        this.page = data.page;
        data.trips.forEach((trip: any) => {
          this.tripsProposed.push({
            id: trip.trip_id,
            driverId: trip.driver,
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
      }),
    ).subscribe(() => {
      this.subscriptionComplete = true;
      console.log(this.tripsProposed);
    });
  }

}
