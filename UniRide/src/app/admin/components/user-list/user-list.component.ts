import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/models/user.model';
import { Table } from 'primeng/table';
import { UserServiceMock } from '../../../core/services/user/user.service.mock';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatisticService } from '../../../core/services/statistic/statistic.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  /**
   * Arguments for the chart
   */
  dataTrip: any;
  dataUser: any;
  options: any;
  textColor: string = 'black';

  lisUsers: User[] = [];

  loading: boolean = true;
  roles!: any[]
  @ViewChild('displayUsers') table!: Table;

  constructor(
    private userService: UserService,
    private userServiceMock: UserServiceMock,
    private router: Router,
    private toastr: ToastrService,
    private statistiqueService: StatisticService,
  ) { }

  ngOnInit() {
    this.setOptionsDoughnut();

    /**
     * Call the API to get sstatistics of the trip
     */
    this.statistiqueService.getTripsNumber().subscribe({
      next: (data: any) => {
        console.log("data", data);
        this.getDataTrip(data.trip_infos)
      },
      error: (error: any) => {
        this.toastr.error('La récupération des statistiques des trajets a echoué . Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })

    /**
     * Call the API to get statistics of the user
     */
    this.statistiqueService.getNumberOfUsers().subscribe({
      next: (data: any) => {
        this.getDataUser(data.user_infos)
      },
      error: (error: any) => {
        this.toastr.error('La récupération des statistiques des utilisateurs a echoué . Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })

    this.userService.getListUsers().subscribe({
      next: (data: any) => {
        this.lisUsers = data.users;
        this.toastr.success('La liste des utilisateurs a été récupérée avec succès.', 'Info ✅📄🔄👍');
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
    this.router.navigate([`/admin/users/${id_user}`], { queryParams: { id_user: id_user } })
  }

  getDataTrip(trip_infos: any) {
    const color = ['#ffa630', "#d7e8ba", "#4da1a9", "#2e5077", "#611c35"];
    this.dataTrip = {
      labels: ['Total des trajets en attente', 'Total des trajets en cours', 'Total des trajets terminés', 'Total des trajets annulés'],
      datasets: [
        {
          data: [trip_infos.trip_pending, trip_infos.trip_oncourse, trip_infos.trip_completed, trip_infos.trip_canceled],
          backgroundColor: color,
          hoverBackgroundColor: color
        }
      ]
    };
  }

  getDataUser(user_infos: any) {
    const color = ['#b74f6f', "#adbdff", "#3185fc", "#34e5ff"];
    this.dataUser = {
      labels: ['Total des administrateurs', 'Total compte en attente', 'Total des conducteurs', 'Total des passagers'],
      datasets: [
        {
          data: [user_infos.admin_count_value, user_infos.pending_count_value, user_infos.drivers_count_value, user_infos.passenger_count_value],
          backgroundColor: color,
          hoverBackgroundColor: color
        }
      ]
    };
  }

  setOptionsDoughnut() {
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: this.textColor
          }
        }
      }
    };
  }
}
