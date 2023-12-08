import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../models/trip.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trip-proposed',
  templateUrl: './trip-proposed.component.html',
  styleUrls: ['./trip-proposed.component.css']
})
export class TripProposedComponent implements OnInit {

  @Input() trip!: Trip;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }


}
