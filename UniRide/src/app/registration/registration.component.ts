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
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/),],],
      password_confirmation: ['',[Validators.required,Validators.minLength(8)]],
      gender: ['', Validators.required],
      phone_number: ['', [Validators.required,Validators.minLength(9)]],
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


      const inputPhotoProfile = this.createFileInput('pfp','Photo de profile', this.onFileChange);
      const inputPermis = this.createFileInput('license','Permis',  this.onFileChange);
      const inputCNI = this.createFileInput('id_card',"Carte d'identité", this.onFileChange);
      const inputCertificat = this.createFileInput('school_certificate','Certificat de scolarité', this.onFileChange);

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

  createFileInput(controlName: string, label: string, changeHandler: (event: any, controlName: string) => void): HTMLElement {
    // Créer le label
    const labelElement = this.renderer.createElement('label');
    this.renderer.setAttribute(labelElement, 'class', 'block font-bold mb-2 text-sm font-medium text-white dark:text-white');
    this.renderer.setAttribute(labelElement, 'for', 'file_input');
    this.renderer.setProperty(labelElement, 'textContent', label);

    // Créer l'input
    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'class', 'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400');
    this.renderer.setAttribute(input, 'aria-describedby', 'file_input_help');
    this.renderer.setAttribute(input, 'id', 'file_input');
    this.renderer.setAttribute(input, 'type', 'file');
    this.renderer.listen(input, 'change', (event) => changeHandler.call(this, event, controlName));

    // Créer le paragraphe d'aide
    const helpParagraph = this.renderer.createElement('p');
    this.renderer.setAttribute(helpParagraph, 'class', 'mt-1 text-xs italique');
    this.renderer.setAttribute(helpParagraph, 'id', 'file_input_help');
    this.renderer.setProperty(helpParagraph, 'textContent', 'PNG, JPG, PDF (MAX. 5 MO).');

    // Créer le conteneur div pour regrouper les éléments
    const containerDiv = this.renderer.createElement('div');
    this.renderer.appendChild(containerDiv, labelElement);
    this.renderer.appendChild(containerDiv, input);
    this.renderer.appendChild(containerDiv, helpParagraph);

    return containerDiv;
}



  createButton(text: string, clickHandler: () => void): HTMLElement {
    const button = this.renderer.createElement('button');
    this.renderer.setAttribute(button, 'class', 'bg-blue-500 text-white p-2 rounded');
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

  passwordsMatch(): boolean {
    const password = this.inscriptionForm.get('password')?.value;
    const confirmPassword = this.inscriptionForm.get('password_confirmation')?.value;

    return password === confirmPassword;
  }

}
