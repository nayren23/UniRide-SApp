import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../Services/trip/trip.service';
import { Trip } from '../models/trip.models';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent implements OnInit {

  trip!: Trip;

  constructor(
    private tripService: TripService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTripDetails();
   }

   getTripDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.tripService.getTripById(id).subscribe({
      next: (data) => {
        this.trip = data;
      },
      error: (err) => console.error(err)
    });
  }

  getStatusLabel(status?: number): string {
    switch (status) {
      case 1: return 'En Attente';
      case 2: return 'Annulé';
      case 3: return 'Fini';
      case 4: return 'En Cours';
      default: return 'Inconnu';
    }
  }
}
