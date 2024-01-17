import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TripInfoComponent } from "./components/trip-info/trip-info.component";

const routes: Routes = [
    { path: '', component: TripInfoComponent }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TripInfoRoutingModule {

}