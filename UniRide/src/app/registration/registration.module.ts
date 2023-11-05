import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { RegistrationComponent } from './registration.component'; // Assurez-vous d'importer le composant
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [ReactiveFormsModule,FormsModule], // Ajoutez ReactiveFormsModule ici
})
export class RegistrationModule { }
