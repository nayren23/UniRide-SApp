import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../environements/environment.prod';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  inscriptionForm: FormGroup;
  afficherChampsFichier = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  
  ) {
    this.inscriptionForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      student_email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/),],],
      password_confirmation: ['',[Validators.required,Validators.minLength(8)]],
      gender: ['', Validators.required],
      phone_number: ['', [Validators.required,Validators.minLength(9)]],
      description: [''],
      license: [''],
      id_card: [''],
      school_certificate: [''],
      pfp: [''],
     });

  
  }




  isFormValid(): boolean {
    return this.inscriptionForm.valid;
  }
  onSubmit() {
    //Route pour insertion data
    const apiUrlRegister = environment.apiUrl + "/user/register";
    console.log(this.inscriptionForm.value)



    if (this.inscriptionForm && this.inscriptionForm.valid) {
      const formData = new FormData();


      //Form user data
      formData.append('login', this.inscriptionForm.get('login')?.value || '');
      formData.append('firstname', this.inscriptionForm.get('firstname')?.value || '');
      formData.append('lastname', this.inscriptionForm.get('lastname')?.value || '');
      formData.append('student_email', this.inscriptionForm.get('student_email')?.value || '');
      formData.append('password', this.inscriptionForm.get('password')?.value || '');
      formData.append('password_confirmation', this.inscriptionForm.get('password_confirmation')?.value || '');
      formData.append('gender', this.inscriptionForm.get('gender')?.value || '');
      formData.append('phone_number', this.inscriptionForm.get('phone_number')?.value || '');
      formData.append('description', this.inscriptionForm.get('description')?.value || '');
      formData.append('pfp', this.inscriptionForm.get('pfp')?.value || '');
      formData.append('license', this.inscriptionForm.get('license')?.value || '');
      formData.append('id_card', this.inscriptionForm.get('id_card')?.value || '');
      formData.append('school_certificate', this.inscriptionForm.get('school_certificate')?.value || '');


      formData.forEach((value, key) => {
        console.log(`Clé: ${key}, Valeur: ${value}`);
      });


      const headers = new HttpHeaders({
       
      });
      

      //Envoie des infos personnel
      this.http.post(apiUrlRegister, formData,{ headers: headers }).subscribe(
        (response) => {
          console.log(response);
          window.location.href = "/logIn";


        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  handleFileInput(event: Event, fileType: string): void {
    const inputElement = event.target as HTMLInputElement;
    const file = (inputElement.files as FileList)[0];

    // Ajoute le fichier au formulaire
    this.inscriptionForm.get(fileType)?.setValue(file);

    // Pour afficher le nom du fichier sélectionné (facultatif)
    const fileNameLabel = document.getElementById(`${fileType}_file_label`);
    if (fileNameLabel) {
      fileNameLabel.innerText = file.name;
    }
  }

  passwordsMatch(): boolean {
    const password = this.inscriptionForm.get('password')?.value;
    const confirmPassword = this.inscriptionForm.get('password_confirmation')?.value;

    return password === confirmPassword;
  }

}
