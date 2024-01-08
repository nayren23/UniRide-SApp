import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripPassengerListComponent } from './components/trip-passenger-list/trip-passenger-list.component';
import { SharedModule } from '../shared/shared.module';
import { TripPassengerRoutingModule } from './trip-passenger.rooting.module';



@NgModule({
  declarations: [
    TripPassengerListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    TripPassengerRoutingModule
  ],
  exports: [
    TripPassengerListComponent
  ]
})
export class TripPassengerModule { }
