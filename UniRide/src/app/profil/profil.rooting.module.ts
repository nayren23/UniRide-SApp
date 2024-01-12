import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"; import { ProfilInformationComponent } from "./components/profil-information/profil-information.component";
;

const routes: Routes = [
    { path: '', component: ProfilInformationComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfilRoutingModule {

}