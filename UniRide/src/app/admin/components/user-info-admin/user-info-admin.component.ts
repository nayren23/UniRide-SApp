import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { User } from '../../../core/models/user.model'
import { UserServiceMock } from '../../../core/services/user/user.service.mock'
import { UserService } from '../../../core/services/user/user.service'
import { StatisticService } from '../../../core/services/statistic/statistic.service'
import { StatisticServiceMock } from '../../../core/services/statistic/statistic.service.mock'
import { ConfirmationService } from 'primeng/api'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-user-info-admin',
  templateUrl: './user-info-admin.component.html',
  styleUrls: ['./user-info-admin.component.css']
})

export class UserInfoAdminComponent implements OnInit {

  id_user: number = -1
  user: User = new User()
  data_driver: any
  data_passenger: any
  list_statistics: any
  average_rating: number = 0
  options: any


  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private statisticsService: StatisticService,
    private statisticsServiceMock: StatisticServiceMock,
    private userServiceMock: UserServiceMock,
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id_user = params['id_user']
    })

    this.getDataUser()
    this.getStatisticsUser()
  }

  /**
   * Call the API to get the user information
   */
  getDataUser() {
    this.userService.getInfosUserById(this.id_user).subscribe({
      next: (data: any) => {
        this.user = data.user_information
      },
      error: (error: any) => {
        console.log(error)
        this.toastr.error('La récupération des informations de l\'utilisateur a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
      },
    })

  }

  /**
   * Call the API to get statistics of the user
   */
  getStatisticsUser() {
    this.statisticsService.getStatisticByUserId(this.id_user).subscribe({
      next: (data: any) => {
        this.list_statistics = data.statistics
        this.setDriverData()
        this.setPassengerData()
        this.setOptionsDoughnutStatistic()
        this.average_rating = this.list_statistics[2].average_rating
      },
      error: (error: any) => {
        console.log(error)
      },
    })
  }

  setOptionsDoughnutStatistic() {
    this.options = this.statisticsService.setOptionsDoughnut()
  }

  private setDriverData() {
    const colors = ["#10ffcb", "#fbd87f", "#FF6384", "#36A2EB"]
    this.data_driver = {
      labels: ['Trajets effectués', 'Trajets en attente', 'Trajets annulés', 'Trajets en cours'],
      datasets: [
        {
          data: [this.list_statistics[0].driver_trip.completed_count, this.list_statistics[0].driver_trip.pending_count,
          this.list_statistics[0].driver_trip.canceled_count, this.list_statistics[0].driver_trip.oncourse_count],
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }]
    }
  }

  private setPassengerData() {
    const colors = ["#4CAF50", "#FFA500"]

    this.data_passenger = {
      labels: ['Trajets effectués', 'Trajets en attente'],
      datasets: [
        {
          data: [this.list_statistics[1].passenger_trip.completed_count, this.list_statistics[1].passenger_trip.pending_count],
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }]
    }
  }

  performAction(event: Event, message: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser()
      },
      reject: () => {
        this.toastr.warning(`Vous n'avez pas effectué la suppression de l'utilisateur.`, 'Action annulée')
      }
    })
  }

  deleteUser() {
    this.userService.deleteUserById(this.id_user).subscribe({
      next: (data: any) => {
        this.toastr.success('L\'utilisateur a été supprimé avec succès.', 'Info')
        setTimeout(() => {
          this.router.navigate(['/admin/users'])
        }, 3000
        )
      },
      error: (error: any) => {
        console.log(error)
        this.toastr.error('La suppression de l\'utilisateur a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
      },
    })
  }

  /**
   * This method is used to convert the role from a number to a string
   * @param role 
   * @returns 
   */
  convertRoleUser(role: any) {
    return this.userService.convertRole(role)
  }

  /**
 * Return the severity of role  user
 * @param status 
 * @returns 
 */
  getSeverityUser(status: any) {
    return this.userService.getSeverity(status)
  }
}