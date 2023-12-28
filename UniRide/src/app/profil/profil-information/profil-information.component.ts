import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../../app/services/profil/profil.service';
import { User } from '../../../app/models/user.model';

@Component({
  selector: 'app-profil-information',
  templateUrl: './profil-information.component.html',
  styleUrls: ['./profil-information.component.css']
})
export class ProfilInformationComponent implements OnInit {
  user!: User;
  editedUser: Partial<User> = {};
  editingField: keyof User | null = null;

  constructor(private profilService: ProfilService) { }

  ngOnInit(): void {
    this.getuserInfo();
  }

  getuserInfo(): void {
    this.profilService.getUserInfo().subscribe(
      (user_profil: User) => {
        this.user = user_profil;
        // Copie profonde de l'objet user_profil dans editeduser
        this.editedUser = JSON.parse(JSON.stringify(user_profil));
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations utilisateur', error);
      }
    );
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
}
