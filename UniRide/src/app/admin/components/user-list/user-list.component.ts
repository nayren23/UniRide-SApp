import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/models/user.model';
import { Table } from 'primeng/table';
import { UserServiceMock } from '../../../core/services/user/user.service.mock';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  lisUsers: User[] = [];

  loading: boolean = true;
  roles!: any[]
  @ViewChild('displayUsers') table!: Table;

  constructor(
    private userService: UserService,
    private userServiceMock: UserServiceMock,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.userServiceMock.getInfosUser().subscribe({
      next: (data: any) => {
        this.lisUsers = data;
        this.toastr.success('La liste des utilisateurs a été récupérée avec succès.', 'Info ✅📄🔄👍');
        console.log("data", data);
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('La récupération de la liste des utilisateurs a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
      complete: () => {
        this.loading = false;
      }
    })

    this.roles = [
      { label: 0, value: this.convertRole(0) },
      { label: 1, value: this.convertRole(1) },
      { label: 2, value: this.convertRole(2) },
      { label: 3, value: this.convertRole(3) },
    ];
  }

  clear(table: Table) {
    this.toastr.success('Tous les filtres ont été réinitialisés avec succès.', 'Info ✅📄🔄👍');
    table.clear();
  }

  /**
   * This method is used to convert the role from a number to a string
   * @param role 
   * @returns 
   */
  convertRole(role: number): string {
    switch (role) {
      case 0:
        return 'Administrateur';
      case 1:
        return 'Conducteur';
      case 2:
        return 'Passager';
      case 3:
        return 'En attente';
      default:
        return 'Inconnu';
    }
  }

  getSeverity(status: number) {
    switch (status) {
      case 0:
        return 'danger';

      case 1:
        return 'success';

      case 2:
        return 'info';

      case 3:
        return 'warning';

      default:
        return 'warning';
    }
  }

  manageRequestVerificationDocument(id_user: number) {
    this.router.navigate([`/admin/users/${id_user}`]);
  }
}
