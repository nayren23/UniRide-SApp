import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripProposedComponent } from './components/trip-proposed/trip-proposed.component';
import { TripProposedListComponent } from './components/trip-proposed-list/trip-proposed-list.component';
import { TripProposedRoutingModule } from './trip-proposed.rooting.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TripProposedComponent,
    TripProposedListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    TripProposedRoutingModule,
  ],
  exports: [
    TripProposedComponent,
    TripProposedListComponent
  ]
})
export class TripProposedModule { }
