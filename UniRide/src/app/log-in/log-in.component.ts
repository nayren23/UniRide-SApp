// log-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Services/Auth/auth.service'; // Importez le service d'authentification
import { environment } from '../environements/environment.prod';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  connexionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.connexionForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const apiUrl = environment.apiUrl + "/user/auth";
    if (this.connexionForm.valid) {
      const formData = this.connexionForm.value;
      this.http.post(apiUrl, formData).subscribe(
        (response: any) => {
          this.authService.setToken(response["token"]); // Utilisez le service d'authentification pour stocker le token
          console.log(response["token"])
          window.location.href = "/create-search";
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
