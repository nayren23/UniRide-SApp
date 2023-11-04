import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  inscriptionForm: FormGroup;
  emailFieldTouched = false;

  constructor(private formBuilder: FormBuilder) {
    
    this.inscriptionForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]], // Utilisation de la validation personnalisée
      motDePasse: ['', Validators.required],
      confirmationMotDePasse: ['', Validators.required],
      
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Validation personnalisée pour vérifier que les mots de passe correspondent
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('motDePasse');
    const confirmPasswordControl = formGroup.get('confirmationMotDePasse');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ mismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  // Validation personnalisée pour l'adresse e-mail
  emailValidator(control: FormGroup) {
    const email = control.value;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

    if (!emailPattern.test(email)) {
      return { invalidEmail: true };
    }

    return null;
  }

  // Fonction pour gérer la soumission du formulaire
  onSubmit() {
    if (this.inscriptionForm.valid) {
      // Le formulaire est valide, vous pouvez traiter les données ici
      // Les mots de passe sont les mêmes si le formulaire est valide
    }
  }
}
