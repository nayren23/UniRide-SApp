import { Component, Renderer2, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environements/environment.prod';

interface FileInputHandlers {
  onFileChange(event: any, controlName: string): void;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements FileInputHandlers {
  inscriptionForm: FormGroup;
  afficherChampsFichier = false;
  votreFormulaire: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
  ) {
    this.inscriptionForm = this.formBuilder.group({
      login: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      student_email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['',Validators.required],
      gender: ['', Validators.required],
      phone_number: ['', Validators.required],
      description: [''],
     });

    this.votreFormulaire = this.formBuilder.group({
      license: [''],
      id_card: [''],
      school_certificate: [''],
      pfp: [''],
    });
  }


  //methodes pour changer les attributs du form
  changerAttributs(): void {
    const formulaire = document.getElementById('monFormulaire');
    if (formulaire) {
      while (formulaire.firstChild) {
        this.renderer.removeChild(formulaire, formulaire.firstChild);
      }


      const inputPhotoProfile = this.createFileInput('pfp', this.onFileChange);
      const inputPermis = this.createFileInput('license', this.onFileChange);
      const inputCNI = this.createFileInput('id_card', this.onFileChange);
      const inputCertificat = this.createFileInput('school_certificate', this.onFileChange);

      this.renderer.appendChild(formulaire, inputPhotoProfile);
      this.renderer.appendChild(formulaire, inputPermis);
      this.renderer.appendChild(formulaire, inputCNI);
      this.renderer.appendChild(formulaire, inputCertificat);

      const btnInscrire = this.createButton('S\'inscrire', this.onSubmit);
      this.renderer.appendChild(formulaire, btnInscrire);
    }

    this.afficherChampsFichier = true;
    this.cdRef.detectChanges();
  }

  createFileInput(controlName: string, changeHandler: (event: any, controlName: string) => void): HTMLElement {
    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'type', 'file');
    this.renderer.setAttribute(input, 'class', 'file-upload');
    this.renderer.setAttribute(input, 'formControlName', controlName);
    this.renderer.listen(input, 'change', (event) => changeHandler.call(this, event, controlName));

    return input;
  }

  createButton(text: string, clickHandler: () => void): HTMLElement {
    const button = this.renderer.createElement('button');
    this.renderer.setAttribute(button, 'class', 'button1');
    this.renderer.listen(button, 'click', () => clickHandler.call(this));
    this.renderer.appendChild(button, this.renderer.createText(text));

    return button;
  }

  onFileChange(event: any, controlName: string): void {
    const files = event.target.files;

    if (files.length > 0) {
      const file = files[0];

      // Ajoutez le fichier réel à la FormData
      this.votreFormulaire.get(controlName)?.setValue(file);
    }
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
      formData.append('pfp', this.votreFormulaire.get('pfp')?.value || '');
      formData.append('license', this.votreFormulaire.get('license')?.value || '');
      formData.append('id_card', this.votreFormulaire.get('id_card')?.value || '');
      formData.append('school_certificate', this.votreFormulaire.get('school_certificate')?.value || '');


      formData.forEach((value, key) => {
        console.log(`Clé: ${key}, Valeur: ${value}`);
      });



      //Envoie des infos personnel
      this.http.post(apiUrlRegister, formData).subscribe(
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
