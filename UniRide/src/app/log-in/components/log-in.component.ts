// log-in.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  connexionForm!: FormGroup;
  message = {
    severity: '',
    summary: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.connexionForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      keepLoggedIn: [false],
    });
  }

  onSubmit() {
    if (this.connexionForm.valid) {
      const formData = this.connexionForm.value;
      this.authService.logIn(formData).subscribe({
        next: (response: any) => {
          if (response['email_verified']) {
            this.message.severity = 'success';
            this.message.summary = 'Connexion réussie';
            this.authService.getUserIDAndRole().subscribe({
              next: (data: any) => {
                sessionStorage.setItem('user_id', data.id);
                sessionStorage.setItem('user_r', data.role);
                this.authService.setIsAuthentified(true);
                if (data.role == 3) {
                  this.router.navigate(['/profil-information']);
                  this.toastr.error('Pour accéder aux fonctionnalités, la carte d\'identité et le certificat de scolarité doivent être vérifiés', 'Informations manquantes')
                } else {
                  this.router.navigate(['']);
                }
              },
              error: (error: any) => {
                console.log('error:', error); this.toastr.error('Une erreur s\'est produite', 'Erreur')
              }
            });
          } else {
            this.authService.getUserIDAndRole().subscribe({
              next: (data: any) => {
                sessionStorage.setItem('user_id', data.id);
                sessionStorage.setItem('user_r', data.role);
                this.authService.setIsAuthentified(true);
                this.router.navigate(['/email/resend']);
              },
              error: (error: any) => {
                console.log('error:', error);
                this.toastr.error('Une erreur s\'est produite', 'Erreur')
              }
            });
          }
        },
        error: (error: any) => {
          console.log('error:', error);
          if (error.error.message == 'USER_NOT_FOUND' || error.error.message == 'PASSWORD_INCORRECT') {
            this.message.severity = 'error';
            this.message.summary = 'Identifiant ou mot de passe incorrect';
          } else {
            this.toastr.error('Une erreur s\'est produite', 'Erreur')
          }
        }
      });
    }
  }
}
