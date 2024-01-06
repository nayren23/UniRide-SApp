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

  dataDocument: any;
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
    this.setOptionsDoughnut();

    /**
     * Call the API to get statistics of the document
     */
    this.statistiqueService.getNumberOfDocuments().subscribe({
      next: (data: any) => {
        this.getDataDocument(data.document_infos)
      },
      error: (error: any) => {
        this.toastr.error('La récupération des statistiques des documents a echoué . Veuillez réessayer ultérieurement.', 'Erreur 📄❌🔄');
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

  getDataDocument(document_infos: any) {
    const color = ["#c4a381", '#bbd686', "#b2675e"];
    this.dataDocument = {
      labels: ['Total des documents en attente', 'Total des documents validés', 'Total des documents refusés'],
      datasets: [
        {
          data: [document_infos.document_pending, document_infos.document_validated, document_infos.document_refused],
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