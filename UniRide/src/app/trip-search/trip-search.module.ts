import { NgModule } from '@angular/core';
import { TripSearchComponent } from './components/trip-search/trip-search.component';
import { TripSearchResultComponent } from './components/trip-search-result/trip-search-result.component';
import { TripSearchResultListComponent } from './components/trip-search-result-list/trip-search-result-list.component';
import { SharedModule } from '../shared/shared.module';
import { TripSearchRoutingModule } from './trip-search.rooting.module';

@NgModule({
  declarations: [
    TripSearchComponent,
    TripSearchResultComponent,
    TripSearchResultListComponent
  ],
  imports: [
    SharedModule,
    TripSearchRoutingModule
  ],
  exports: [
    TripSearchComponent,
    TripSearchResultComponent,
    TripSearchResultListComponent
  ],
})
export class TripSearchModule { }
