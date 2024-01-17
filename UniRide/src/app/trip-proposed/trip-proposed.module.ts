import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripProposedListComponent } from './components/trip-proposed-list/trip-proposed-list.component';
import { TripProposedRoutingModule } from './trip-proposed.rooting.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TripProposedListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    TripProposedRoutingModule,
  ],
  exports: [
    TripProposedListComponent
  ]
})
export class TripProposedModule { }
