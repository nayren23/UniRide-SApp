import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundRoutingModule } from './page-not-found.rooting.module';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
