import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TripPassengerListComponent } from './components/trip-passenger-list/trip-passenger-list.component';

const routes: Routes = [
    { path: '', component: TripPassengerListComponent }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TripPassengerRoutingModule {

}