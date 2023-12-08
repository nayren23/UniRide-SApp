import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { FormsModule } from '@angular/forms';
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripSearchComponent } from './trip-search/trip-search.component';
import { TripSearchResultComponent } from './trip-search-result/trip-search-result.component';
import { TripSearchResultListComponent } from './trip-search-result-list/trip-search-result-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResendMailComponent } from './resend-mail/resend-mail.component';
import { TripProposedComponent } from './trip-proposed/trip-proposed.component';
import { TripProposedListComponent } from './trip-proposed-list/trip-proposed-list.component';
import { DistancePipe } from './pips/distance/distance.pipe';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LogInComponent,
    CreateTripComponent,
    TripSearchComponent,
    TripSearchResultComponent,
    EmailVerificationComponent,
    ResendMailComponent,
    TripSearchResultComponent,
    TripSearchResultListComponent,
    TripProposedComponent,
    TripProposedListComponent,
    DistancePipe,
    TripInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required for toastr animations
    ToastrModule.forRoot(),
    CardModule,
    ButtonModule

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr);
  }
}

