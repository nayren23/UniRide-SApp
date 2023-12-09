import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../models/trip.models';
import { MapService } from '../Services/map/map.service';

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
