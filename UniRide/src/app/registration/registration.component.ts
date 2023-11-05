import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  inscriptionForm: FormGroup;
  emailFieldTouched = false;

  formData = {
    login: '',
    firstname: '',
    lastname: '',
    student_email: '',
    password: '',
    password_confirmation:'',
    gender: '',
    phone_number: '',
    description: '',
  };


  constructor(private formBuilder: FormBuilder, private http: HttpClient) {

    this.inscriptionForm = this.formBuilder.group({
      login: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      student_email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: [''], // Si vous avez une confirmation de mot de passe
      gender: ['', Validators.required],
      phone_number: ['', Validators.required],
      description: ['', Validators.required],

    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Validation personnalisée pour vérifier que les mots de passe correspondent
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('password_confirmation');

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


  // Fonction pour gérer la soumission du formulaire
  onSubmit() {
    if (this.inscriptionForm.valid) {
      console.log(this.formData)

      // Le formulaire est valide, vous pouvez traiter les données ici
      // Les mots de passe sont les mêmes si le formulaire est valide

      const url = 'https://127.0.0.1:5050/user/register'; // Assurez-vous que l'URL correspond à votre route Flask
      this.http.post(url, this.formData).subscribe(
        (response) => {
          // Traitez la réponse de Flask ici
          console.log(response);
        },
        (error) => {
          // Gérez les erreurs en cas de problème
          console.error(error);
        }
      );
    }
  }
}
