import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../../app/services/profil/profil.service';
import { User } from '../../../app/models/user.model';
import { Car } from '../../../app/models/car.model';
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
  carInfoLoaded: boolean = false;
  car!: Car
  constructor(private profilService: ProfilService) { }

  ngOnInit(): void {
    this.getuserInfo();
    this.getcarinfo();
    console.log(this.car);
  }
  getcarinfo(): void {
    this.profilService.getCarInformation().subscribe(
      (car: Car) => {
        this.car = car;
        this.carInfoLoaded = true;
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations voiture', error);
      }
    );
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
  hasCar(): boolean {
    return this.car && this.car.user_id !== null;
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
    this.profilService.addCar(this.car).subscribe(
      (response) => {
        console.log('Car added successfully', response);
        // Ajoutez une logique ici pour traiter la réussite de l'ajout
      },
      (error) => {
        console.error('Error adding car', error);
        // Ajoutez une logique ici pour traiter les erreurs
      }
    );
  }
  updateCar(): void {
    this.profilService.updateCar(this.car).subscribe(
      (response) => {
        console.log('Car updated successfully', response);
        // Ajoutez une logique ici pour traiter la réussite de la mise à jour
      },
      (error) => {
        console.error('Error updating car', error);
        // Ajoutez une logique ici pour traiter les erreurs
      }
    );
  }
  
}
