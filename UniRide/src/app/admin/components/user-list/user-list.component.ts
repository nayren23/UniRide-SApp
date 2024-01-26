import { Component, OnInit, ViewChild } from '@angular/core'
import { UserService } from '../../../core/services/user/user.service'
import { User } from '../../../core/models/user.model'
import { Table } from 'primeng/table'
import { UserServiceMock } from '../../../core/services/user/user.service.mock'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { StatisticService } from '../../../core/services/statistic/statistic.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  /**
   * Arguments for the chart
   */
  dataTrip: any
  dataUser: any
  options: any

  lisUsers: User[] = []

  loading: boolean = true
  @ViewChild('displayUsers') table!: Table

  constructor(
    private userService: UserService,
    private userServiceMock: UserServiceMock,
    private router: Router,
    private toastr: ToastrService,
    private statisticsService: StatisticService,
  ) { }

  ngOnInit() {
    this.setOptionsDoughnutStatistic()
    this.getStatisticUser()
    this.getStatisticTrip()
    this.getUsers()
  }

  /**
   * Call the API to get statistics of the user
   */
  getStatisticUser() {
    this.statisticsService.getNumberOfUsers().subscribe({
      next: (data: any) => {
        this.getDataUser(data.user_infos)
      },
      error: (error: any) => {
        this.toastr.error('La récupération des statistiques des utilisateurs a echoué . Veuillez réessayer ultérieurement.', 'Erreur')
      },
    })
  }

  /**
   * Call the API to get sstatistics of the trip
   */
  getStatisticTrip() {
    this.statisticsService.getTripsNumber().subscribe({
      next: (data: any) => {
        this.getDataTrip(data.trip_infos)
      },
      error: (error: any) => {
        this.toastr.error('La récupération des statistiques des trajets a echoué . Veuillez réessayer ultérieurement.', 'Erreur')
      },
    })
  }

  /**
   * Call the API to get the list of users
   */
  getUsers() {
    this.userService.getListUsers().subscribe({
      next: (data: any) => {
        data.users.forEach((verification: any) => {
          const user: User = {
            id: verification.id_user,
            firstname: verification.firstname,
            lastname: verification.lastname,
            last_modified_date: verification.last_modified_date,
            profile_picture: verification.profile_picture,
            role: verification.role,
          }
          this.lisUsers.push(user)
        })
        this.lisUsers = [...this.lisUsers]
        this.loading = false
      },
      error: (error: any) => {
        this.loading = true
        console.log(error)
        this.toastr.error('La récupération de la liste des utilisateurs a échoué. Veuillez réessayer ultérieurement.', 'Erreur')
      },
    })
  }

  /**
   * Clear the filters of the table
   * @param table 
   */
  clear(table: Table) {
    this.toastr.success('Tous les filtres ont été réinitialisés avec succès.', 'Info')
    table.clear()
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
  getSeverityUser(status: number) {
    return this.userService.getSeverity(status)
  }

  manageRequestVerificationDocument(id_user: number) {
    this.router.navigate([`/admin/users/${id_user}`], { queryParams: { id_user: id_user } })
  }

  /**
   * Retur the chart of the number of trips
   * @param status 
   * @returns
   */
  getDataTrip(trip_infos: any) {
    const color = ['#ffa630', "#d7e8ba", "#4da1a9", "#2e5077", "#611c35"]
    this.dataTrip = {
      labels: ['Total des trajets en attente', 'Total des trajets en cours', 'Total des trajets terminés', 'Total des trajets annulés'],
      datasets: [
        {
          data: [trip_infos.trip_pending, trip_infos.trip_oncourse, trip_infos.trip_completed, trip_infos.trip_canceled],
          backgroundColor: color,
          hoverBackgroundColor: color
        }
      ]
    }
  }

  /**
   * Return the chart of the number of users
   * @param status 
   * @returns
   */
  getDataUser(user_infos: any) {
    const color = ['#b74f6f', "#adbdff", "#3185fc", "#34e5ff"]
    this.dataUser = {
      labels: ['Total des administrateurs', 'Total compte en attente', 'Total des conducteurs', 'Total des passagers'],
      datasets: [
        {
          data: [user_infos.admin_count_value, user_infos.pending_count_value, user_infos.drivers_count_value, user_infos.passenger_count_value],
          backgroundColor: color,
          hoverBackgroundColor: color
        }
      ]
    }
  }

  /**
   * Set the options of the doughnut chart
   */
  setOptionsDoughnutStatistic() {
    this.options = this.statisticsService.setOptionsDoughnut()
  }
}