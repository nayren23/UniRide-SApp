import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  connexionForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.connexionForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    }, {
    });

  }



  onSubmit() {
    if (this.connexionForm.valid) {
    const formData = this.connexionForm.value;
    console.log(formData);

    const url = 'https://127.0.0.1:5050/user/auth'; // Assurez-vous que l'URL correspond à votre route Flask
    this.http.get(url, formData).subscribe(
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
