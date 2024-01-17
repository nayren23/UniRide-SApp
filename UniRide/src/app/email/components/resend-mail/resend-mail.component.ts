import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailService } from 'src/app/core/services/email/email.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resend-mail',
  templateUrl: './resend-mail.component.html',
  styleUrls: ['./resend-mail.component.css']
})
export class ResendMailComponent {
  constructor(private http: HttpClient, private emailService: EmailService, private toastr: ToastrService) { }

  onSubmit() {
    this.emailService.resendVerificationEmail().subscribe({
      next: (data: any) => { this.toastr.success('Email de vérifivation envoyé', 'Email envoyé'); },
      error: (error: any) => { this.toastr.error('Une erreur s\'est produite. Veuillez réessayer plus tard.', 'Erreur') }
    });
  }
}


