import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripSearchComponent } from './trip-search/trip-search.component';
import{TripSearchResultComponent} from './trip-search-result/trip-search-result.component'
import { EmailVerificationComponent } from './email-verification/email-verification.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent }, // Chemin vers le premier composant
  { path: 'logIn', component: LogInComponent }, // Chemin vers le premier composant
  { path: 'create-trip', component: CreateTripComponent },
  { path: 'create-search', component: TripSearchComponent },
  {    path: 'search-results',
    component: TripSearchResultComponent,
    data: { trips: null } },
  { path: 'email-verification/:token', component: EmailVerificationComponent }



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
