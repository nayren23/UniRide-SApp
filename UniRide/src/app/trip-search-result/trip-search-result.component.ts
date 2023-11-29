import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../models/trip.models';

@Component({
  selector: 'app-trip-search-result',
  templateUrl: './trip-search-result.component.html',
  styleUrls: ['./trip-search-result.component.css']
})
export class TripSearchResultComponent implements OnInit {

  @Input() trip!: Trip;

  constructor() { }

  ngOnInit(): void { }

}
