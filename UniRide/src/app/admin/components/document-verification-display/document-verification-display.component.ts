import { Component, OnInit, ViewChild } from '@angular/core'
import { DocumentVerificationService } from '../../../core/services/document-verification/document-verification.service'
import { Table } from 'primeng/table'
import { DocumentVerificationDisplay } from '../../../core/models/document-verification-display'
import { Router } from '@angular/router'
import { StatisticService } from '../../../core/services/statistic/statistic.service'
import { ToastrService } from 'ngx-toastr'
import { User } from '../../../core/models/user.model'

@Component({
  selector: 'app-document-verification-display',
  templateUrl: './document-verification-display.component.html',
  styleUrls: ['./document-verification-display.component.css'],
})
export class DocumentVerificationDisplayComponent implements OnInit {

  /**
   * Arguments for the chart
   */
  dataDocument: any
  options: any

  /**
   * Arguments for the table
   */
  documentVerification: DocumentVerificationDisplay[] = []
  users: User[] = [] // a changer avec un modele
  loading: boolean = true
  @ViewChild('dt1') table!: Table

  constructor(
    private documentVerificationService: DocumentVerificationService,
    private router: Router,
    private statisticsService: StatisticService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.setOptionsDoughnutStatistic()
    this.getStatisticsDocument()
    this.getDocumentVerification()
  }

  /**
  * Call the API to get the document verification for the user
  */
  getDocumentVerification() {
    this.documentVerificationService.getDocumentVerification().subscribe({
      next: (data: any) => {
        data.request.forEach((verification: any) => {
          const user: User = {
            id: verification.person.id_user,
            firstname: verification.person.first_name,
            lastname: verification.person.last_name,
            profile_picture: verification.person.profile_picture,
          }
          const documentVerification = new DocumentVerificationDisplay(verification.request_number, verification.documents_to_verify, user)
          this.documentVerification.push(documentVerification)
          this.users.push(user)
        })
        this.users = [...this.users]
        this.documentVerification = [...this.documentVerification]
        this.loading = false
      },
      error: (error: any) => {
        this.loading = true
        this.toastr.error('La récupération des demandes a échoué ', 'Erreur')
      },
    })
  }

  /**
  * Call the API to get statistics of the document
  */
  getStatisticsDocument() {
    this.statisticsService.getNumberOfDocuments().subscribe({
      next: (data: any) => {
        this.getDataDocument(data.document_infos)
      },
      error: (error: any) => {
        this.toastr.error('La récupération des statistiques des documents a echoué . Veuillez réessayer ultérieurement.', 'Erreur')
      },
    })
  }

  /**
   * This method is used to clear the filters of the table
   * @param table 
   */
  clear(table: Table) {
    this.toastr.success('Tous les filtres ont été réinitialisés avec succès.', 'Info')
    table.clear()
  }

  /**
   * This method is used to manage the request verification document
   * @param id_user 
   * @param full_name 
   */
  manageRequestVerificationDocument(id_user: number) {
    this.router.navigate(['admin/documents/verify'], { queryParams: { id_user: id_user } })
  }

  /**
   * This method is used to get the data for the doughnut chart
   * @param document_infos 
   */
  getDataDocument(document_infos: any) {
    const color = ["#c4a381", '#bbd686', "#b2675e"]
    this.dataDocument = {
      labels: ['Total des documents en attente', 'Total des documents validés', 'Total des documents refusés'],
      datasets: [
        {
          data: [document_infos.document_pending, document_infos.document_validated, document_infos.document_refused],
          backgroundColor: color,
          hoverBackgroundColor: color
        }
      ]
    }
  }

  /**
   * This method is used to set the options of the doughnut chart
   */
  setOptionsDoughnutStatistic() {
    this.options = this.statisticsService.setOptionsDoughnut()
  }
}