import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { RegistrationComponent } from './registration.component'; // Assurez-vous d'importer le composant

@NgModule({
  declarations: [RegistrationComponent],
  imports: [ReactiveFormsModule], // Ajoutez ReactiveFormsModule ici
})
export class RegistrationModule { }
