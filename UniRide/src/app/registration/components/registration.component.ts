import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  inscriptionForm!: FormGroup;
  afficherChampsFichier = false;
  showDriverSection: boolean = false;
  maxFileSize = 5000000; // 5 Mo
  genderOptions = [
    { label: 'Homme', value: 'H' },
    { label: 'Femme', value: 'F' },
    { label: 'Autre', value: 'N' }
  ];
  messages!: { [key: string]: { severity: string, summary: string } };


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.inscriptionForm = this.formBuilder.group({
      showDriverSection: [false], // Assure-toi que cette ligne est présente
      login: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._-]{1,50}$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z-]{1,50}$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z-]{1,50}$/)]],
      student_email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])){8,50}/),],],
      password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      // gender: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      description: ['', Validators.maxLength(500)],
      pfp: [''],
      id_card: [''],
      school_certificate: [''],
      license: [''],
      insurance: [''],
      acceptConditions: [false, Validators.requiredTrue],
    });
    this.messages = {
      login: {
        severity: '',
        summary: '',
      },
      firstname: {
        severity: '',
        summary: '',
      },
      lastname: {
        severity: '',
        summary: '',
      },
      student_email: {
        severity: '',
        summary: '',
      },
      password: {
        severity: '',
        summary: '',
      },
      password_confirmation: {
        severity: '',
        summary: '',
      },
      gender: {
        severity: '',
        summary: '',
      },
      phone_number: {
        severity: '',
        summary: '',
      },
      description: {
        severity: '',
        summary: '',
      },
      id_card: {
        severity: '',
        summary: '',
      },
      school_certificate: {
        severity: '',
        summary: '',
      },
      pfp: {
        severity: '',
        summary: '',
      },
      license: {
        severity: '',
        summary: '',
      },
      insurance: {
        severity: '',
        summary: '',
      }
    };
  }

  isFormValid(): boolean {
    return this.inscriptionForm.valid;
  }
  onSubmit() {
    //Route pour insertion data

    if (this.inscriptionForm && this.inscriptionForm.valid) {
      const formData = new FormData();


      //Form user data
      formData.append('login', this.inscriptionForm.get('login')?.value || '');
      formData.append('firstname', this.inscriptionForm.get('firstname')?.value || '');
      formData.append('lastname', this.inscriptionForm.get('lastname')?.value || '');
      formData.append('student_email', this.inscriptionForm.get('student_email')?.value || '');
      formData.append('password', this.inscriptionForm.get('password')?.value || '');
      formData.append('password_confirmation', this.inscriptionForm.get('password_confirmation')?.value || '');
      formData.append('gender', 'N');
      formData.append('phone_number', 0 + this.inscriptionForm.get('phone_number')?.value || '');
      formData.append('description', this.inscriptionForm.get('description')?.value || '');
      formData.append('pfp', this.inscriptionForm.get('pfp')?.value || '');
      formData.append('id_card', this.inscriptionForm.get('id_card')?.value || '');
      formData.append('school_certificate', this.inscriptionForm.get('school_certificate')?.value || '');
      formData.append('license', this.inscriptionForm.get('license')?.value || '');
      formData.append('insurance', this.inscriptionForm.get('insurance')?.value || '');




      //Envoie des infos personnel
      this.authService.register(formData).subscribe({
        next: (response) => {
          this.toastr.success('Inscription réussie !', 'Succès');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          switch (error.error.message) {
            case 'LOGIN_TAKEN':
              this.messages['login'].severity = 'error';
              this.messages['login'].summary = 'Ce nom d\'utilisateur est indisponible.';
              this.scrollToSection('div_login');
              break;
            case 'EMAIL_TAKEN':
              this.messages['student_email'].severity = 'error';
              this.messages['student_email'].summary = 'Cette adresse email est déjà utilisée.';
              this.scrollToSection('div_student_email');
              break;
            case 'EMAIL_INVALID_FORMAT':
              this.messages['student_email'].severity = 'error';
              this.messages['student_email'].summary = 'L\'adresse email est invalide.';
              this.scrollToSection('div_student_email');
              break;
            case 'EMAIL_INVALID_DOMAIN':
              this.messages['student_email'].severity = 'error';
              this.messages['student_email'].summary = 'L\'adresse email doit être l\'adresse email de l\'université.';
              this.scrollToSection('div_student_email');
              break;
            case 'PHONE_NUMBER_TAKEN':
              this.messages['phone_number'].severity = 'error';
              this.messages['phone_number'].summary = 'Ce numéro de téléphone est déjà utilisé.';
              this.scrollToSection('div_phone_number');
              break;
            default:
              this.toastr.error('Une erreur est survenue lors de l\'inscription.', 'Erreur');
          }
        }
      });
    }
  }

  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleFileInput(event: Event, fileType: string): void {
    const inputElement = event.target as HTMLInputElement;
    const file = (inputElement.files as FileList)[0];

    // Ajoute le fichier au formulaire
    if (file.size > this.maxFileSize) {
      this.messages[fileType].severity = 'error';
      this.messages[fileType].summary = 'Le fichier est trop volumineux. La taille maximale est de 5 Mo.';
    } else {
      this.messages[fileType].severity = '';
      this.inscriptionForm.get(fileType)?.setValue(file);

      // Pour afficher le nom du fichier sélectionné (facultatif)
      const fileNameLabel = document.getElementById(`${fileType}_file_label`);
      if (fileNameLabel) {
        fileNameLabel.innerText = file.name;
      }
    }
  }


  toggleLicenseSection(): void {
    this.showDriverSection = !this.showDriverSection;
  }

  passwordsMatch(): boolean {
    const password = this.inscriptionForm.get('password')?.value;
    const confirmPassword = this.inscriptionForm.get('password_confirmation')?.value;

    return password === confirmPassword;
  }

  checkLogin(): void {
    if (this.inscriptionForm.get('login')?.errors?.['required']) {
      this.messages['login'].severity = 'error';
      this.messages['login'].summary = 'Le nom d\'utilisateur est requis.';
    } else if (this.inscriptionForm.get('login')?.errors?.['pattern']) {
      this.messages['login'].severity = 'error';
      this.messages['login'].summary = 'Seuls les lettres, les chiffres, -, . et _ sont autorisés.';
    } else {
      this.messages['login'].severity = '';
    }
  }

  checkLastname(): void {
    if (this.inscriptionForm.get('lastname')?.errors?.['required']) {
      this.messages['lastname'].severity = 'error';
      this.messages['lastname'].summary = 'Le nom est requis.';
    } else if (this.inscriptionForm.get('lastname')?.errors?.['pattern']) {
      this.messages['lastname'].severity = 'error';
      this.messages['lastname'].summary = 'Seuls les lettres et les tirets sont autorisés.';
    } else {
      this.messages['lastname'].severity = '';
    }
  }

  checkFirstname(): void {
    if (this.inscriptionForm.get('firstname')?.errors?.['required']) {
      this.messages['firstname'].severity = 'error';
      this.messages['firstname'].summary = 'Le prénom est requis.';
    } else if (this.inscriptionForm.get('firstname')?.errors?.['pattern']) {
      this.messages['firstname'].severity = 'error';
      this.messages['firstname'].summary = 'Seuls les lettres et les tirets sont autorisés.';
    } else {
      this.messages['firstname'].severity = '';
    }
  }

  checkEmail(): void {
    if (this.inscriptionForm.get('student_email')?.errors?.['required']) {
      this.messages['student_email'].severity = 'error';
      this.messages['student_email'].summary = 'L\'adresse email est requise.';
    } else if (this.inscriptionForm.get('student_email')?.errors?.['email']) {
      this.messages['student_email'].severity = 'error';
      this.messages['student_email'].summary = 'L\'adresse email est invalide.';
    } else {
      this.messages['student_email'].severity = '';
    }
  }

  checkPassword(): void {
    if (this.inscriptionForm.get('password')?.errors?.['required']) {
      this.messages['password'].severity = 'error';
      this.messages['password'].summary = 'Le mot de passe est requis.';
    } else if (this.inscriptionForm.get('password')?.errors?.['pattern']) {
      this.messages['password'].severity = 'error';
      this.messages['password'].summary = 'Le mot de passe doit contenir au moins 8 caractères, dont une minuscule, une majuscule et un caractère spécial.';
    } else {
      this.messages['password'].severity = '';
    }
  }

  checkPhoneNumber(): void {
    if (this.inscriptionForm.get('phone_number')?.errors?.['required']) {
      this.messages['phone_number'].severity = 'error';
      this.messages['phone_number'].summary = 'Le numéro de téléphone est requis.';
    } else if (this.inscriptionForm.get('phone_number')?.errors?.['minlength']) {
      this.messages['phone_number'].severity = 'error';
      this.messages['phone_number'].summary = 'Le numéro de téléphone doit contenir 9 chiffres.';
    } else {
      this.messages['phone_number'].severity = '';
    }
  }
}
