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
      password_confirmation: [''],
      gender: ['', Validators.required],
      phone_number: ['', Validators.required],
      description: [''],
    });

    this.votreFormulaire = this.formBuilder.group({
      permis: [''],
      CNI: ['', Validators.required],
      certificat: ['', Validators.required],
    });
  }


  //methodes pour changer les attributs du form
  changerAttributs(): void {
    const formulaire = document.getElementById('monFormulaire');
    if (formulaire) {
      while (formulaire.firstChild) {
        this.renderer.removeChild(formulaire, formulaire.firstChild);
      }
      const heading = this.renderer.createElement('p');
    this.renderer.setAttribute(heading, 'id', 'heading');
    this.renderer.appendChild(heading, this.renderer.createText('Inscription'));
    formulaire.appendChild(heading);


      const inputPermis = this.createFileInput('permis', this.onFileChange);
      const inputCNI = this.createFileInput('CNI', this.onFileChange);
      const inputCertificat = this.createFileInput('certificat', this.onFileChange);

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
      const fileName = files[0].name;
      console.log(`Chemin de l'image pour ${controlName}: ${fileName}`);

      // Si vous souhaitez également mettre à jour la valeur du contrôle dans le formulaire, vous pouvez le faire ainsi :
      this.votreFormulaire.get(controlName)?.setValue(fileName);
    }
  }


  onSubmit() {
    //Route pour insertion data
    const apiUrlRegister = environment.apiUrl + "/user/register";



    if (this.inscriptionForm && this.inscriptionForm.valid) {
      const formData = new FormData();
      const docsFormData = new FormData();

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


      //Form docs
      docsFormData.append('permis', this.votreFormulaire.get('permis')?.value || '');
      docsFormData.append('CNI', this.votreFormulaire.get('CNI')?.value || '');
      docsFormData.append('certificat', this.votreFormulaire.get('certificat')?.value || '');


      //Envoie des infos personnel
      this.http.post(apiUrlRegister, formData).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );


      //Envoie des docs
    }
  }
}
