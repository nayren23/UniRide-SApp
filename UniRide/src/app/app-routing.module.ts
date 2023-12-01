import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripSearchComponent } from './trip-search/trip-search.component';
import {TripSearchResultComponent} from './trip-search-result/trip-search-result.component'
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResendMailComponent } from './resend-mail/resend-mail.component';
import { TripSearchResultListComponent } from './trip-search-result-list/trip-search-result-list.component'
import { TripProposedComponent } from './trip-proposed/trip-proposed.component';
import { TripProposedListComponent } from './trip-proposed-list/trip-proposed-list.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent }, // Chemin vers le premier composant
  { path: 'logIn', component: LogInComponent }, // Chemin vers le premier composant
  { path: 'create-trip', component: CreateTripComponent },
  { path: 'create-search', component: TripSearchComponent },
  { path: 'email-verification/:token', component: EmailVerificationComponent },
  { path: 'resend-mail', component: ResendMailComponent },
  {
    path: 'search-results',
    component: TripSearchResultListComponent,
    // Utilisez la même clé que celle que vous essayez d'accéder dans TripSearchResultListComponent
    data: { trips: null }
  },
  { path: 'trips-proposed', component: TripProposedListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
