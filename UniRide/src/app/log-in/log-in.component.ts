// log-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth/auth.service';
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
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.connexionForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      keepLoggedIn: [],
    });
  }

  onSubmit() {
    if (this.connexionForm.valid) {
      const formData = this.connexionForm.value;
      this.authService.logIn(formData).subscribe(
        (response: any) => {
          console.log(response)
          if (response['informations_verified']['email_verified']) {
            this.toastr.success('Félicitations ! Votre connexion a réussi.', 'Connexion réussie');
            this.router.navigate(['/create-search']);
          } else {
            this.toastr.error('Veuillez verifier votre adresse email pour vous connecter.', 'Verifier email');
          }
        },
        (error) => {
          console.error(error);
          this.toastr.error('Nom d\'utilisateur ou mot de passe incorrect', 'Erreur de connexion');
        }
      );
    }

  }

}
