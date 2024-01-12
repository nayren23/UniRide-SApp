import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'logIn', loadChildren: () => import('./log-in/log-in.module').then(m => m.LogInModule) },
  {
    path: 'trips',
    children: [
      { path: 'create', loadChildren: () => import('./create-trip/create-trip.module').then(m => m.CreateTripModule) },
      { path: 'search', loadChildren: () => import('./trip-search/trip-search.module').then(m => m.TripSearchModule) },
      { path: 'proposed', loadChildren: () => import('./trip-proposed/trip-proposed.module').then(m => m.TripProposedModule) },
      { path: 'passenger', loadChildren: () => import('./trip-passenger/trip-passenger.module').then(m => m.TripPassengerModule) },
      { path: ':id', loadChildren: () => import('./trip-info/trip-info.module').then(m => m.TripInfoModule) }
    ]
  },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'validate-passenger', loadChildren: () => import('./validate-passenger/validate-passenger.module').then(m => m.ValidatePassengerModule) },
  { path: 'profil-information', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule) },
  { path: 'ranking', loadChildren: () => import('./ranking/ranking.module').then(m => m.RankingModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
