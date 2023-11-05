import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
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
    password_confirmation: '',
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
      password_confirmation: [''],
      gender: ['', Validators.required],
      phone_number: ['', Validators.required],
      description: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  onGenderChange(event: any) {
    this.formData.gender = event.target.value;
  }

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

  onSubmit() {
    if (this.inscriptionForm.valid) {
      console.log(this.formData);

      const url = 'https://127.0.0.1:5050/user/register'; // Assurez-vous que l'URL correspond à votre route Flask
      this.http.post(url, this.formData).subscribe(
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
