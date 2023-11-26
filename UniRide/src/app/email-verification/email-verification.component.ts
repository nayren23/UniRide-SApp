import { Component, OnInit } from '@angular/core';
import { environment } from '../environements/environment.prod';
import { AuthService } from '../Services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit{

  constructor(private authService: AuthService,private http: HttpClient,private route: ActivatedRoute){


  }


    ngOnInit(): void {
      const tokenEmail = this.route.snapshot.params['token'];

    if (tokenEmail) {
      const apiUrl = environment.apiUrl + "/user/verify/email/" + tokenEmail;

      // Utilisez subscribe pour déclencher la requête GET
      this.http.get(apiUrl).subscribe(
        (response: any) => {
          // Traitez la réponse de la requête GET ici
          console.log("Réponse de la requête GET :", response);

          // Ajoutez d'autres actions à effectuer après la vérification de l'e-mail si nécessaire

        },
        (error) => {
          // Gérez les erreurs de la requête GET ici
          console.error("Erreur de la requête GET :", error);

          // Ajoutez d'autres actions à effectuer en cas d'erreur si nécessaire
        }
      );
    } else {
      console.error("Token non disponible. L'utilisateur n'est peut-être pas connecté.");
      // Ajoutez des actions à effectuer en cas d'absence de token si nécessaire
    }

    }




  }







