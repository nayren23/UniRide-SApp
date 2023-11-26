import { Component, OnInit } from '@angular/core';
import { environment } from '../environements/environment.prod';
import { AuthService } from '../Services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    ){


  }


    ngOnInit(): void {
      const tokenEmail = this.route.snapshot.params['token'];

    if (tokenEmail) {
      const apiUrl = environment.apiUrl + "/user/verify/email/" + tokenEmail;

      // Utilisez subscribe pour déclencher la requête GET
      this.http.get(apiUrl).subscribe(
        (response = "EMAIL_VERIFIED_SUCCESSFULLY") => {
          console.log("Réponse de la requête GET :", response);
          this.toastr.success("Félicitations ! La verification s'est bien effectué.", 'Connexion réussie');
          setTimeout(() => {
            this.router.navigate(['/logIn']);
          }, 2000);
        },

        (error = "EMAIL_ALREADY_VERIFIED") => {
          console.error("Erreur de la requête GET :", error);
          this.toastr.error('Erreur de verification', 'Email deja verifier');

        },

        (error = "LINK_EXPIRED") => {
          console.error("Erreur de la requête GET :", error);
          this.toastr.error('Erreur de verification', 'Lien expiré');

        },

      );
    } else {
      console.error("Token non disponible. L'utilisateur n'est peut-être pas connecté.");
      this.toastr.error("Erreur de verification', 'Lien expiré");
    }

    }




  }







