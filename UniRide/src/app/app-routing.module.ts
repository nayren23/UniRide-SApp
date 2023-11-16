import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTripComponent } from './Create-trip/create-trip.component';
import { TripSearchComponent } from './trip-search/trip-search.component';
import{TripSearchResultComponent} from './trip-search-result/trip-search-result.component'


const routes: Routes = [
  { path: 'create-trip', component: CreateTripComponent },
  { path: 'create-search', component: TripSearchComponent },
  { path: 'search-results', component: TripSearchResultComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
