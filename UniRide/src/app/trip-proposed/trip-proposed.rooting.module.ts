import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TripProposedListComponent } from "./components/trip-proposed-list/trip-proposed-list.component";

const routes: Routes = [
    { path: '', component: TripProposedListComponent }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TripProposedRoutingModule {

}