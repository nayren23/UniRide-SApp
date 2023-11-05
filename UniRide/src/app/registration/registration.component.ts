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
    }, {
    });
  }


  onSubmit() {
      if (this.inscriptionForm.valid) {
      const formData = this.inscriptionForm.value;
      console.log(formData);

      const url = 'https://127.0.0.1:5050/user/register'; // Assurez-vous que l'URL correspond à votre route Flask
      this.http.post(url, formData).subscribe(
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
