import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentVerificationService } from '../../../core/services/document-verification/document-verification.service';
import { Table } from 'primeng/table';
import { DocumentVerificationDisplay } from '../../../core/models/document-verification-display';
import { Router } from '@angular/router';
import { Student } from '../../../core/models/student.model';
import { StatisticService } from '../../../core/services/statistic/statistic.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-document-verification-display',
  templateUrl: './document-verification-display.component.html',
  styleUrls: ['./document-verification-display.component.css'],
})
export class DocumentVerificationDisplayComponent implements OnInit {

  /**
   * Arguments for the chart
   */
  dataTrip: any;
  dateUser: any;
  options: any;
  textColor: string = 'black';

  /**
   * Arguments for the table
   */
  documentVerification: DocumentVerificationDisplay[] = [];
  students: Student[] = []; // a changer avec un modele
  loading: boolean = true;
  @ViewChild('dt1') table!: Table;

  constructor(
    private documentVerificationService: DocumentVerificationService,
    private router: Router,
    private statistiqueService: StatisticService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getOptionsDoughnut();

    /**
     * Call the API to get sstatistics of the trip
     */
    this.statistiqueService.getTripsNumber().subscribe({
      next: (data: any) => {
        console.log(data.trip_infos);
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
        this.getDateUser(data.user_infos)
      },
      error: (error: any) => {
        this.toastr.error('La récupération des statistiques des utilisateurs a echoué . Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
      },
    })

    /**
     * Call the API to get the document verification for the user
     */
    this.documentVerificationService.getDocumentVerification().subscribe({
      next: (data: any) => {
        this.loading = false;
        data.request.forEach((verification: any) => {
          const student = new Student(verification.person.last_name, verification.person.first_name, verification.person.profile_picture, verification.person.id_user);
          const documentVerification = new DocumentVerificationDisplay(verification.request_number, verification.documents_to_verify, student);
          this.documentVerification.push(documentVerification);
          this.students.push(student);
        })
      },
      error: (error: any) => {
        this.loading = true;
        this.toastr.error('La récupération des demandes a échoué ', 'Erreur 📄❌🔄');
      },
      complete: () => {
        this.table.clear();//We need to call this method to refresh the table, cause the table is not refreshed automatically, when we call the API
      }
    })
  }

  /**
   * This method is used to clear the filters of the table
   * @param table 
   */
  clear(table: Table) {
    this.toastr.success('Tous les filtres ont été réinitialisés avec succès.', 'Info ✅📄🔄👍');
    table.clear();
  }

  /**
   * This method is used to manage the request verification document
   * @param id_user 
   * @param full_name 
   */
  manageRequestVerificationDocument(id_user: number, student: Student) {
    const full_name = student.first_name + ' ' + student.last_name
    this.router.navigate(['admin/documents/verify'], { queryParams: { id_user: id_user, full_name: full_name } });
  }

  getDataTrip(trip_infos: any) {
    this.dataTrip = {
      labels: ['Total des trajets', 'Total des trajets en cours', 'Total des trajets terminés', 'Total des trajets annulés', 'Total des trajets en attente'],
      datasets: [
        {
          data: [trip_infos.trip_count, trip_infos.trip_oncourse, trip_infos.trip_completed, trip_infos.trip_canceled, trip_infos.trip_pending],
          backgroundColor: ['#ffa630', "#d7e8ba", "#4da1a9", "#2e5077", "#611c35"],
          hoverBackgroundColor: ['#ffa630', "#d7e8ba", "#4da1a9", "#2e5077", "#611c35"]
        }
      ]
    };
  }

  getDateUser(user_infos: any) {
    this.dateUser = {
      labels: ['Total compte en attente', 'Total des utilisateurs', 'Total des conducteurs', 'Total des passagers'],
      datasets: [
        {
          data: [user_infos.pending_count_value, user_infos.user_count_value, user_infos.drivers_count_value, user_infos.passenger_count_value],
          backgroundColor: ['#b74f6f', "#adbdff", "#3185fc", "#34e5ff"],
          hoverBackgroundColor: ['#b74f6f', "#adbdff", "#3185fc", "#34e5ff"]
        }
      ]
    };
  }

  getOptionsDoughnut() {
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