import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environements/environment.prod';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  inscriptionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.inscriptionForm = this.formBuilder.group({
      login: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      student_email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: [''],
      gender: ['', Validators.required],
      phone_number: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {

    const apiUrl = environment.apiUrl + "/user/register"; // Récupérez l'URL à partir de l'environnement
    console.log(apiUrl)

    if (this.inscriptionForm && this.inscriptionForm.valid) {
      const formData = new FormData();
      formData.append('login', this.inscriptionForm.get('login')?.value || '');
      formData.append('firstname', this.inscriptionForm.get('firstname')?.value || '');
      formData.append('lastname', this.inscriptionForm.get('lastname')?.value || '');
      formData.append('student_email', this.inscriptionForm.get('student_email')?.value || '');
      formData.append('password', this.inscriptionForm.get('password')?.value || '');
      formData.append('password_confirmation', this.inscriptionForm.get('password_confirmation')?.value || '');
      formData.append('gender', this.inscriptionForm.get('gender')?.value || '');
      formData.append('phone_number', this.inscriptionForm.get('phone_number')?.value || '');
      formData.append('description', this.inscriptionForm.get('description')?.value || '');
    
      // Envoyer la requête POST avec FormData
      this.http.post(apiUrl, formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
}
