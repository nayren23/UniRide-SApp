import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
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
      student_email: ['', [Validators.required, Validators.email]],
    });
    this.messages = {
      student_email: {
        severity: '',
        summary: '',
      },
    };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      this.authService.forgotPassword(formData).subscribe({
        next: (response: any) => {
          this.message.severity = 'success';
          this.message.summary = 'Un email vous a été envoyé.';
        },
        error: (error: any) => {
          if (error.error.message === 'USER_NOT_FOUND') {
            this.message.severity = 'error';
            this.message.summary = 'L\'adresse email n\'existe pas.';
          } else {
            this.message.severity = 'error';
            this.message.summary = 'Une erreur s\'est produite.';
          }
        }
      });
    }
  }

  checkEmail(): void {
    if (this.passwordForm.get('student_email')?.errors?.['required']) {
      this.messages['student_email'].severity = 'error';
      this.messages['student_email'].summary = 'L\'adresse email est requise.';
    } else if (this.passwordForm.get('student_email')?.errors?.['email']) {
      this.messages['student_email'].severity = 'error';
      this.messages['student_email'].summary = 'L\'adresse email est invalide.';
    } else {
      this.messages['student_email'].severity = '';
    }
  }
}
