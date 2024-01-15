import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { roleGuardFactory } from './core/guards/role-guard';
import { ROLES } from './core/const/roles';

const routes: Routes = [
  { path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'login', loadChildren: () => import('./log-in/log-in.module').then(m => m.LogInModule) },
  {
    path: 'trips',
    canActivateChild: [roleGuardFactory],
    children: [
      {
        path: 'create', loadChildren: () => import('./create-trip/create-trip.module').then(m => m.CreateTripModule),
        data: { roles: [ROLES.DRIVER] }
      },
      {
        path: 'search', loadChildren: () => import('./trip-search/trip-search.module').then(m => m.TripSearchModule),
        data: { roles: [ROLES.DRIVER, ROLES.PASSENGER] }
      },
      {
        path: 'proposed', loadChildren: () => import('./trip-proposed/trip-proposed.module').then(m => m.TripProposedModule),
        data: { roles: [ROLES.DRIVER] }
      },
      {
        path: 'passenger', loadChildren: () => import('./trip-passenger/trip-passenger.module').then(m => m.TripPassengerModule),
        data: { roles: [ROLES.DRIVER, ROLES.PASSENGER] }
      },
      {
        path: ':id', loadChildren: () => import('./trip-info/trip-info.module').then(m => m.TripInfoModule),
        data: { roles: [ROLES.DRIVER, ROLES.PASSENGER] }
      },
      
        { path: 'ranking', loadChildren: () => import('./ranking/ranking.module').then(m => m.RankingModule) 
                data: { roles: [ROLES.DRIVER, ROLES.PASSENGER] }

        },

    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, roleGuardFactory],
    data: { roles: [ROLES.ADMIN] }
  },
  {
    path: 'profil-information', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule),
    canActivate: [AuthGuard],
  },

  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
