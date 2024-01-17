import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  passwordForm!: FormGroup;
  message = {
    severity: '',
    summary: '',
  };
  messages!: { [key: string]: { severity: string, summary: string } };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      new_password: ['', [Validators.required, Validators.pattern(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])){8,50}/),],],
      new_password_confirmation: ['', Validators.required],
    });
    this.messages = {
      new_password: {
        severity: '',
        summary: '',
      },
    };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const token = this.route.snapshot.paramMap.get('token')!;
      const formData = this.passwordForm.value;
      this.authService.changePassword(formData, token).subscribe({
        next: (response: any) => {
          this.message.severity = 'success';
          this.message.summary = 'Votre mot de passe a été modifié.';
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          if (error.error.message === 'LINK_EXPIRED') {
            this.message.severity = 'error';
            this.message.summary = 'Le lien a expiré.';
          } else {
            this.message.severity = 'error';
            this.message.summary = 'Une erreur s\'est produite.';
          }
        }
      });
    }
  }

  checkPassword(): void {
    if (this.passwordForm.get('new_password')?.errors?.['required']) {
      this.messages['new_password'].severity = 'error';
      this.messages['new_password'].summary = 'Le mot de passe est requis.';
    } else if (this.passwordForm.get('new_password')?.errors?.['pattern']) {
      this.messages['new_password'].severity = 'error';
      this.messages['new_password'].summary = 'Le mot de passe doit contenir au moins 8 caractères, dont une minuscule, une majuscule et un caractère spécial.';
    } else {
      this.messages['new_password'].severity = '';
    }
  }

  passwordsMatch(): boolean {
    const password = this.passwordForm.get('new_password')?.value;
    const confirmPassword = this.passwordForm.get('new_password_confirmation')?.value;

    return password === confirmPassword;
  }
}
