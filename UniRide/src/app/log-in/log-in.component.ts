import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environements/environment.prod';





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
    const apiUrl = environment.apiUrl + "/user/auth"; // Récupérez l'URL à partir de l'environnement
    console.log(apiUrl)
    if (this.connexionForm.valid) {
    const formData = this.connexionForm.value;
    console.log(formData);
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
