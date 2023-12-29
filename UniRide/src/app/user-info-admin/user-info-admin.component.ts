import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../core/models/user.model';
import { UserServiceMock } from '../core/services/user/user.service.mock';
import { UserService } from '../core/services/user/user.service';
import { StatisticService } from '../core/services/statistic/statistic.service';
import { StatisticServiceMock } from '../core/services/statistic/statistic.service.mock';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-info-admin',
  templateUrl: './user-info-admin.component.html',
  styleUrls: ['./user-info-admin.component.css']
})

export class UserInfoAdminComponent implements OnInit {

  id_user: number = -1;
  user: User = new User();
  data_driver: any;
  data_passenger: any
  list_statistics: any;
  average_rating: number = 0;
  options: any;


  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userServiceMock: UserServiceMock,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private statisticsService: StatisticService,
    private statisticsServiceMock: StatisticServiceMock,
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id_user = params['id_user'];
    });

    this.userServiceMock.getInfosUserById(this.id_user).subscribe({
      next: (data: any) => {
        this.user = data;
        this.toastr.success('Les informations de l\'utilisateur ont été récupérées avec succès.', 'Info ✅📄🔄👍');
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('La récupération des informations de l\'utilisateur a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })

    this.statisticsServiceMock.getStatisticByUserId(this.id_user).subscribe({
      next: (data: any) => {
        this.list_statistics = data.statistics;

        console.log("list_statistics", this.list_statistics);

        this.setDriverData();
        this.setOptions();
        this.setPassengerData();
        this.average_rating = this.list_statistics[2].average_rating;
      },
      error: (error: any) => {
        console.log(error);
      },
    })

  }

  setOptions() {
    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: "black",
          }
        }
      }
    };
  }

  setDriverData() {
    this.data_driver = {
      labels: ['Trajets effectués', 'Trajets en attente'],
      datasets: [
        {
          data: [this.list_statistics[0].driver_trip.completed_count, this.list_statistics[0].driver_trip.pending_count],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
          ]
        }]
    };
  }

  setPassengerData() {
    this.data_passenger = {
      labels: ['Trajets effectués', 'Trajets en attente'],
      datasets: [
        {
          data: [this.list_statistics[1].passenger_trip.completed_count, this.list_statistics[1].passenger_trip.pending_count],
          backgroundColor: [
            "#4CAF50",
            "#FFA500",
          ],
          hoverBackgroundColor: [
            "#4CAF50",
            "#FFA500",
          ]
        }]
    };
  }

  performAction(event: Event, message: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser();
      },
      reject: () => {
        this.toastr.warning(`Vous n'avez pas effectué la suppression de l'utilisateur.`, 'Action annulée 📄🚫');
      }
    });
  }

  deleteUser() {
    this.userServiceMock.deleteUserById(this.id_user).subscribe({
      next: (data: any) => {
        this.toastr.success('L\'utilisateur a été supprimé avec succès.', 'Info ✅📄🔄👍');
        console.log("data", data);
        setTimeout(() => {
          this.router.navigate(['/user-list']);
        }, 3000
        );
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('La suppression de l\'utilisateur a échoué. Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })
  }

  /**
  * This method is used to convert the role from a number to a string
  * @param role 
  * @returns 
  */
  convertRole(role: any): string {
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
}
