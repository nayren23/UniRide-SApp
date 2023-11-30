import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../models/trip.models';

@Component({
  selector: 'app-trip-proposed',
  templateUrl: './trip-proposed.component.html',
  styleUrls: ['./trip-proposed.component.css']
})
export class TripProposedComponent implements OnInit {

  @Input() trip!: Trip;

  constructor() { }

  ngOnInit(): void { }

}
