import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentVerificationService } from '../Services/document-verification/document-verification.service';
import { Table } from 'primeng/table';
import { DocumentVerificationDisplay } from '../models/document-verification-display';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Person } from '../models/person';
import { Etudiant } from '../models/etudiant';

@Component({
  selector: 'app-document-verification-display',
  templateUrl: './document-verification-display.component.html',
  styleUrls: ['./document-verification-display.component.css'],
})
export class DocumentVerificationDisplayComponent implements OnInit {

  documentVerification: DocumentVerificationDisplay[] = [];
  etudiants: Etudiant[] = []; // a changer avec un modele
  loading: boolean = true;
  @ViewChild('dt1') table!: Table;

  constructor(
    private documentVerificationService: DocumentVerificationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    /**
     * Call the API to get the document verification for the user
     */
    this.documentVerificationService.getDocumentVerification().subscribe({
      next: (data: any) => {
        this.loading = false;
        data.request.forEach((verification: any) => {
          const person = new Person(verification.person.full_name, verification.person.profile_picture, new Date(verification.person.last_modified_date), verification.person.id_user);
          const documentVerification = new DocumentVerificationDisplay(verification.request_number, verification.documents_to_verify, person);
          this.documentVerification.push(documentVerification);

          const etudiant = new Etudiant(verification.person.full_name, verification.person.profile_picture);
          this.etudiants.push(etudiant);
        })
      },
      error: (error: any) => {
        this.loading = false;
        console.log('error:', error);
      },
      complete: () => {
        this.clear(this.table);//We need to call this method to refresh the table, cause the table is not refreshed automatically, when we call the API
      }
    })
  }

  /**
   * This method is used to clear the filters of the table
   * @param table 
   */
  clear(table: Table) {
    this.messageService.add({ severity: 'success', summary: 'Info ✅📄🔄👍', detail: 'Tous les filtres ont été réinitialisés avec succès.' });
    table.clear();
  }

  /**
   * This method is used to manage the request verification document
   * @param id_user 
   * @param full_name 
   */
  manageRequestVerificationDocument(id_user: number, full_name: string) {
    this.router.navigate(['/manage-request-verification-document'], { queryParams: { id_user: id_user, full_name: full_name } });
  }
}