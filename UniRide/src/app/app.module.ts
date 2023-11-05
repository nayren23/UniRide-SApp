import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { FormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LogInComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

