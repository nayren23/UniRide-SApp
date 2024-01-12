import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../../core/services/profil/profil.service';
import { CarService } from '../../../core/services/car/car.service';
import { User } from '../../../../app/core/models/user.model'
import { Car } from '../../../../app/core/models/car.model'
import { ToastrService } from 'ngx-toastr';
import { userDocuments } from '../../../core/models/user-documents.model';


interface FileUploadEvent {
  originalEvent: any;
  files: File[];
}
@Component({
  selector: 'app-profil-information',
  templateUrl: './profil-information.component.html',
  styleUrls: ['./profil-information.component.css']
})
export class ProfilInformationComponent implements OnInit {
  user!: User;
  editedUser: Partial<User> = {};
  editingField: keyof User | null = null;
  editepassword: boolean = false;
  isNotDriver: boolean = true;
  hasCar!: boolean;
  hasProfilePicture: boolean = false;
  userDocuments: userDocuments[] = [];
  uploadedFiles: { [key: string]: File[] } = {};
  showUploadPhoto: boolean = false;
  changePasswordFormData = {
    old_password: '',
    new_password: '',
    new_password_confirmation: ''
  };
  car: Car = {
    model: '',
    license_plate: '',
    country_license_plate: '',
    color: '',
    brand: '',
    total_places: 0
  };
  constructor(
    private profilService: ProfilService,
    private carService: CarService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getuserInfo();
    this.getcarinfo();
    this.getDocumentsInfos();
  }
  getcarinfo(): void {
    this.carService.getCarInformation().subscribe({
      next: (car: Car) => {
        this.car = car;
        this.hasCar = true;
      },
      error: (error) => {
        console.log('Il n\'existe pas de voiture pour cette utilisateur', error.status);
        if (error.status === 422) {
          this.hasCar = false;
        }
      }
    });
  }

  getDocumentsInfos(): void {
    this.profilService.getUserDocumentsInfo().subscribe({
      next: (data: any) => {
        data.documents.forEach((documentGroup: any) => {
          documentGroup.document.forEach((document: any) => {
            const userDocument = document as userDocuments;
            console.log('userDocument', userDocument.type);

            this.userDocuments.push(userDocument);
          });
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des informations sur les documents', error);
      }
    });
  }

  getuserInfo(): void {
    this.profilService.getUserInfo().subscribe(
      (user: User) => {
        this.user = user;
        this.editedUser = JSON.parse(JSON.stringify(user));
        if (user.profile_picture != null) {
          this.hasProfilePicture = true;
        }


      },
      (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    );
  }


  convertRole(role: any): string {
    switch (role) {
      case 0:
        this.isNotDriver = false;
        return "Administrateur";
      case 1:
        this.isNotDriver = false;
        return "Conducteur";
      case 2:
        return "Passager";
      case 3:
        return "En attente";
      default:
        return "Inconnu";
    }
  }

  /**
   * Function to convert the type of the document
   * @param type 
   * @returns 
   */
  convertType(type: string) {
    switch (type) {
      case 'license':
        return 'Permis de conduire';

      case 'card':
        return 'Carte d\'identité';

      case 'school_certificate':
        return 'Certificat de scolarité';

      case 'insurance':
        return 'Attestation d\'assurance';

      default:
        return 'Document inconnu';
    }
  }

  /**
 * Function to convert the status of the document
 * @param status 
 * @returns 
 */
  convertirStatus(status: string) {
    switch (status) {
      case "1":
        return 'Validé';

      case "0":
        return 'En attente';

      case "-1":
        return 'Refusé';

      default:
        return 'Erreur';
    }
  }
  convertDataType(type: string) {
    switch (type) {
      case 'license':
        return 'license'

      case 'card':
        return 'id_card';

      case 'school_certificate':
        return 'school_certificate';

      case 'insurance':
        return 'insurance';

      default:
        return 'Document inconnu';
    }
  }
  convertRouteType(type: string) {
    switch (type) {
      case 'license':
        return 'license'

      case 'card':
        return 'id-card';

      case 'school_certificate':
        return 'school-certificate';

      case 'insurance':
        return 'insurance';

      default:
        return 'Document inconnu';
    }
  }

  /**
* Return the severity of the document
* @param document 
* @returns 
*/
  getSeverity(status: string) {
    switch (status) {
      case "1":
        return 'success';

      case "0":
        return 'warning';

      case "-1":
        return 'danger';

      default:
        return 'danger';
    }
  };

  toggleUploadPhoto(): void {
    this.showUploadPhoto = !this.showUploadPhoto;
  }

  toggleEdit(field: keyof User): void {
    if (this.editingField === null) {
      // Commencez l'édition du champ spécifique
      this.editingField = field;
    } else if (this.editingField === field) {
      // Enregistrez les modifications si le même champ est cliqué à nouveau
      this.saveChanges();
    } else {
      // Annulez l'édition si un autre champ est cliqué
      this.editingField = null;
    }
  }

  saveChanges(): void {
    if (this.editingField !== null) {
      const updatedValue = this.editedUser[this.editingField] as string;

      this.profilService.editUserInfo(this.editingField, updatedValue).subscribe(
        (response) => {
          console.log(`Modification du champ ${this.editingField} enregistrée avec succès`, response);
          this.editingField = null;
          this.getuserInfo();
          this.toastr.success(`Modification du champ ${this.editingField} enregistrée avec succès.`, 'Info ✅📄🔄👍');
        },
        (error) => {
          console.error(`Erreur lors de l'enregistrement de la modification du champ ${this.editingField}`, error);
          this.toastr.success(`Erreur lors de la Modification du champ ${this.editingField}.`, 'Erreur 📄❌🚗');
        }
      );
    }
  }

  addCar(): void {
    this.carService.addCar(this.car).subscribe({
      next: (response) => {
        this.hasCar = true;
        this.toastr.success('Les informations du véhicule ont été ajoutés avec succès.', 'Info ✅📄🚗👍');
      },
      error: (error) => {
        console.error('Error adding car', error);
        this.toastr.error('Les informations du véhicule n\'ont pas été ajouté.', 'Erreur 📄❌🚗');
      }
    });
  }
  updateCar(): void {
    this.carService.updateCar(this.car).subscribe(
      (response) => {
        console.log('Car updated successfully', response);
        this.toastr.success('Les informations du véhicule ont été modifiés avec succès.', 'Info ✅📄🔄👍');
      },
      (error) => {
        console.error('Error updating car', error);
        this.toastr.error('Les informations du véhicule n\'ont pas été modifié.', 'Erreur 📄❌🔄');
      }
    );
  }

  onUpload(event: FileUploadEvent, document: userDocuments) {
    const documentType = document.type;

    if (event.files && event.files.length > 0) {
      const file = event.files[0];

      this.profilService.saveDocument(file, this.convertDataType(documentType), this.convertRouteType(documentType)).subscribe({
        next: (data: any) => {
          this.toastr.success(`Le document ${documentType} a été enregistré avec succès.`, 'Info ✅📄👍')
          document.url = URL.createObjectURL(file);
        },
        error: (error: any) => {
          this.toastr.error(`Erreur lors de l'enregistrement du document ${documentType}.`, 'Erreur 📄❌🚫');
          console.log('error:', error);
        }
      });
    } else {
      // Gérer le cas où aucun fichier n'a été sélectionné
      console.log('Aucun fichier sélectionné.');
    }
  }
  updateProfilePicture(event: FileUploadEvent) {
    if (event.files && event.files.length > 0) {
      const file = event.files[0];

      this.profilService.saveProfilePicture(file).subscribe({
        next: (data: any) => {
          this.toastr.success('La photo de profil a été enregistré avec succès.', 'Info ✅📄👍')
          this.user.profile_picture = URL.createObjectURL(file);
          this.showUploadPhoto = false;
        },
        error: (error: any) => {
          this.toastr.error('Erreur lors de l\'enregistrement de la photo de profil.', 'Erreur 📄❌🚫');
          console.log('error:', error);
        }
      });
    } else {

      console.log('Aucun fichier sélectionné.');
    }
  }

  openNew() {
    this.editepassword = true;
  }

  passwordsMatch(): boolean {
    const password = this.changePasswordFormData.new_password;
    const confirmPassword = this.changePasswordFormData.new_password_confirmation

    return password === confirmPassword;
  }

  changePassword(): void {
    // Assurez-vous que les champs requis sont remplis
    if (
      !this.changePasswordFormData.old_password ||
      !this.changePasswordFormData.new_password ||
      !this.changePasswordFormData.new_password_confirmation
    ) {
      this.toastr.warning('Veuillez remplir tous les champs.', 'Avertissement');
      return;
    }
    if(this.isSamePassword()){
      this.toastr.warning('Le nouveau mot de passe doit être différent de l\'ancien.', 'Avertissement');
      return;
    }

    // Envoyez la requête de changement de mot de passe
    this.profilService.changePassword(this.changePasswordFormData).subscribe({
      next: (data: any) => {
        this.toastr.success('Le mot de passe a été changé avec succès.', 'Succès');
        // Réinitialisez les champs du formulaire après un changement réussi
        this.changePasswordFormData = {
          old_password: '',
          new_password: '',
          new_password_confirmation: ''
        };
      },
      error: (error: any) => {
        this.toastr.error('Erreur lors du changement de mot de passe.', 'Erreur');
        console.error('Error changing password', error);
      }
    });
  }

  isSamePassword(): boolean {
    const oldPassword = this.changePasswordFormData.new_password;
    const newPassword = this.changePasswordFormData.new_password_confirmation;

    return oldPassword === newPassword;


  }
}



