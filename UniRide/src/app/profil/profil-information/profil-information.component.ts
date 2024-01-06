import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../../app/services/profil/profil.service';
import { User } from '../../../app/models/user.model';
import { Car } from '../../../app/models/car.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profil-information',
  templateUrl: './profil-information.component.html',
  styleUrls: ['./profil-information.component.css']
})
export class ProfilInformationComponent implements OnInit {
  user!: User;
  editedUser: Partial<User> = {};
  editingField: keyof User | null = null;
  isNotDriver: boolean = true;
  hasCar!: boolean;
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
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getuserInfo();
    this.getcarinfo();
  }
  getcarinfo(): void {
    this.profilService.getCarInformation().subscribe({
      next:(car: Car) => {
        this.car = car;
        this.hasCar = true;
      },
      error:(error) => {
        console.log('Il n\'existe pas de voiture pour cette utilisateur', error.status);
        if (error.status === 422) {
          this.hasCar = false;
        }
      }
  });
  }

  getuserInfo(): void {
    this.profilService.getUserInfo().subscribe(
      (user: User) => {
        this.user = user;
        this.editedUser = JSON.parse(JSON.stringify(user));
      
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
          return  "Administrateur";
      case 1:
        this.isNotDriver = false;
        return   "Conducteur";
      case 2:
        return  "Passager";
      case 3:
        return  "En attente";
      default:
        return "Inconnu";
  }
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
        },
        (error) => {
          console.error(`Erreur lors de l'enregistrement de la modification du champ ${this.editingField}`, error);
        }
      );
    }
  }

  addCar(): void {
    this.profilService.addCar(this.car).subscribe({
      next:(response) => {
        this.hasCar = true;
        this.toastr.success('Les informations du véhicule ont été ajoutés avec succès.', 'Info ✅📄🚗👍');
      },
      error:(error) => {
        console.error('Error adding car', error);
        this.toastr.error('Les informations du véhicule n\'ont pas été ajouté.', 'Erreur 📄❌🚗');
      }
  });
  }
  updateCar(): void {
    this.profilService.updateCar(this.car).subscribe(
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
  
}
