import { Component, Input } from '@angular/core';
import {ProfilService} from'../../../app/services/profil/profil.service';
import { OnInit } from '@angular/core';
import { User } from '../../../app/models/user.model';
@Component({
  selector: 'app-profil-information',
  templateUrl: './profil-information.component.html',
  styleUrls: ['./profil-information.component.css']
})
export class ProfilInformationComponent implements OnInit {
  user!: User;
  editedUser: Partial<User> = {};
  editing = false;

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
    if (this.editing) {
      // Vérifiez si le champ a été modifié
      if (this.editedUser[field] !== this.user[field]) {
        const updatedUser: { [key: string]: string } = {};
        updatedUser[field] = this.editedUser[field] as string;
  
        this.profilService.editUserInfo(field, updatedUser).subscribe(
          () => {
            console.log(`Modification du champ ${field} enregistrée avec succès`);
            this.editing = false;
            this.getuserInfo();
          },
          (error) => {
            console.error(`Erreur lors de l'enregistrement de la modification du champ ${field}`, error);
          }
        );
      } else {
        // Aucune modification, sortez du mode d'édition
        this.editing = false;
      }
    } else {
      this.editing = true;
    }
  }
}
