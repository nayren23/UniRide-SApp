import { Component, OnInit } from '@angular/core';
import { environment } from '../environements/environment.prod';
import { AuthService } from '../Services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tokenEmail = this.route.snapshot.params['token'];

    if (tokenEmail) {
      const apiUrl = environment.apiUrl + '/user/verify/email/' + tokenEmail;

      // Utilisez subscribe pour déclencher la requête GET
      this.http.get(apiUrl).subscribe(
        (response: any) => {
          console.log('Réponse de la requête GET :', response);

          if (response.message === 'EMAIL_VERIFIED_SUCCESSFULLY') {
            this.toastr.success("Félicitations ! La vérification s'est bien effectuée.",'Connexion réussie');
            setTimeout(() => {
              this.router.navigate(['/logIn']);
            }, 2000);
          } else {
            this.toastr.error('Erreur de vérification','Réponse inattendue du serveur');
          }
        },
        (error) => {
          if (error.error && error.error.message === 'LINK_EXPIRED') {
            this.toastr.error('Erreur de vérification', 'Lien expiré');
            setTimeout(() => {
              this.router.navigate(['/resend-email']);
            }, 2000);
          } else if (error.error.message === ' LINK_INVALID') {
            this.toastr.error('Erreur de vérification', 'Lien invalide');
            setTimeout(() => {
              this.router.navigate(['/resend-email']);
            }, 2000);
          } else if (error.error.message === 'EMAIL_ALREADY_VERIFIED') {
            this.toastr.error('Erreur de vérification', 'Email déjà vérifié');
            setTimeout(() => {
              this.router.navigate(['/logIn']);
            }, 2000);
          } else {
            this.toastr.error(
              'Erreur de vérification',
              'Erreur inattendue du serveur'
            );
          }
        }
      );
    } else {
      console.error(
        "Token non disponible. L'utilisateur n'est peut-être pas connecté."
      );
      this.toastr.error('Erreur de vérification', 'Lien expiré');
    }
  }
}
