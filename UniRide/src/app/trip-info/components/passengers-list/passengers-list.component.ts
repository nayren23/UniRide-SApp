import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/core/services/trip/trip.service';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.css']
})
export class PassengersListComponent implements OnInit {
  @Input() tripid!: number;
  @Input() totalNumberOfPassenger!: number;
  @Input() numberOfPassenger!: number;
  passengers: User[] = [];
  
  constructor(
    private tripService: TripService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getPassengers();
  }

  getPassengers(): void {
    for (let i = 0; i < this.totalNumberOfPassenger; i++) {
      this.passengers.push(
        {
          firstname: "",
          lastname: "",
          id: -2,
          profile_picture: ""
      }
      )
    }
    for (let i = 0; i < this.numberOfPassenger; i++) {
      this.passengers[i].id++
    }
    let i = 0;
    this.tripService.getTripPassengers(this.tripid).subscribe(
      {next: (data: any) => {
        data.forEach((passenger: any) => {
          this.passengers[i] = {
              firstname: passenger.firstname,
              lastname: passenger.lastname,
              id: passenger.id,
              profile_picture: passenger.pfp
          };
          i++;
        })
      },
      error: (err: any) => console.error(err)
    })
  }
}
