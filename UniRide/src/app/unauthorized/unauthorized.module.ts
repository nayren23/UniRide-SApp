import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SharedModule } from '../shared/shared.module';
import { UnauthorizedRoutingModule } from './unauthorized.rooting.module';



@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    SharedModule,
    UnauthorizedRoutingModule
  ]
})
export class UnauthorizedModule { }
