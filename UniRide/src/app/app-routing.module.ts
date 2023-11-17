import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent }, // Chemin vers le premier composant
  { path: 'logIn', component: LogInComponent }, // Chemin vers le premier composant

  //{ path: 'page2', component: LoginComponent }, // Chemin vers le deuxième composant
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
