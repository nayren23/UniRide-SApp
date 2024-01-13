import { NgModule } from '@angular/core';
import { ProfilRoutingModule } from './profil.rooting.module';
import { ProfilInformationComponent } from './components/profil-information/profil-information.component';
import { SharedModule } from '../shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ProfilInformationComponent
  ],
  imports: [
    SharedModule,
    ProfilRoutingModule,
    PdfViewerModule
  ],
  exports: [
    ProfilInformationComponent
  ]
})
export class ProfilModule { }
