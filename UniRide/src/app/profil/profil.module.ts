import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilRoutingModule } from './profil.rooting.module';
import { ProfilInformationComponent } from './components/profil-information/profil-information.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProfilInformationComponent
  ],
  imports: [
    SharedModule,
    ProfilRoutingModule
  ],
  exports: [
    ProfilInformationComponent
  ]
})
export class ProfilModule { }
