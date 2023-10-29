import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})




export class RegistrationComponent {
  inscriptionForm: FormGroup; // Déclaration de la propriété inscriptionForm

  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    // Initialisation de l'inscriptionForm dans le constructeur
    this.inscriptionForm = this.formBuilder.group({
      // Définissez ici les champs du formulaire


    });
  }



  onsubmit() {
    if (this.inscriptionForm.valid) {
      const formData = this.inscriptionForm.value;
  
      // Envoyez la requête POST vers votre API Flask
      this.http.post('URL_de_votre_API', formData)
        .subscribe(
          (response) => {
            console.log('Inscription réussie ! Réponse du serveur :', response);
            // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions ici.
          },
          (error) => {
            console.error('Erreur lors de l\'inscription :', error);
            // Gérez les erreurs, affichez des messages d'erreur, etc.
          }
        );
    } else {
      console.error('Le formulaire contient des erreurs');
    }
  }
  


}




