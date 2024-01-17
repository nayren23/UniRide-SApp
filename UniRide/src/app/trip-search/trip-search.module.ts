import { NgModule } from '@angular/core';
import { TripSearchComponent } from './components/trip-search/trip-search.component';
import { TripSearchResultListComponent } from './components/trip-search-result-list/trip-search-result-list.component';
import { SharedModule } from '../shared/shared.module';
import { TripSearchRoutingModule } from './trip-search.rooting.module';

@NgModule({
  declarations: [
    TripSearchComponent,
    TripSearchResultListComponent
  ],
  imports: [
    SharedModule,
    TripSearchRoutingModule
  ],
  exports: [
    TripSearchComponent,
    TripSearchResultListComponent
  ],
})
export class TripSearchModule { }
