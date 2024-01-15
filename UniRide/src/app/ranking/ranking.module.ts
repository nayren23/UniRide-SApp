import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './components/ranking/ranking.component';
import { SharedModule } from '../shared/shared.module';
import { RankingRoutingModule } from './ranking.rooting.module';



@NgModule({
  declarations: [
    RankingComponent
  ],
  imports: [
    SharedModule,
    RankingRoutingModule
  ]
})
export class RankingModule { }
