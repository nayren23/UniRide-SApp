// log-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Services/auth/auth.service'; // Importez le service d'authentification
import { environment } from '../environements/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
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
          console.log(response)
          if(response['informations_verified']['email_verified']){
          this.authService.setToken(response["token"]); // Utilisez le service d'authentification pour stocker le token

          this.toastr.success('Félicitations ! Votre connexion a réussi.', 'Connexion réussie');
          setTimeout(() => {
            this.router.navigate(['/create-search']);
          }, 2000); // Réglez la durée selon vos besoins (en millisecondes)
        }else{
          this.toastr.error('Veuillez verifier votre adresse email pour vous connecter.', 'Verifier email');
        }

        },
        (error) => {
          console.error(error);
          this.toastr.error('Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.', 'Erreur de connexion');

        }
      );
    }

  }

}
