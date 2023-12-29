import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../core/models/trip.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trip-search-result',
  templateUrl: './trip-search-result.component.html',
  styleUrls: ['./trip-search-result.component.css']
})
export class TripSearchResultComponent implements OnInit {

  @Input() trip!: Trip;

  constructor(private router: Router) { }

  ngOnInit(): void { }
  goToTripDetails() {
    this.router.navigate([`/trip-info/${this.trip.id}`]);
  }
}
