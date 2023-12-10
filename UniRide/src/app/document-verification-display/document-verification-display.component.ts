import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentVerificationService } from '../Services/document-verification/document-verification.service';
import { Table } from 'primeng/table';
import { DocumentVerification } from '../models/document-verification-display';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-document-verification-display',
  templateUrl: './document-verification-display.component.html',
  styleUrls: ['./document-verification-display.component.css'],
})
export class DocumentVerificationDisplayComponent implements OnInit {

  documentVerification: DocumentVerification[] = [];
  documentTest: DocumentVerification[] = [];

  etudiants: any[] = []; // a changer avec un modele

  loading: boolean = true;

  @ViewChild('dt1') table!: Table;

  subscriptionComplete: boolean = false;
  constructor(
    private documentVerificationService: DocumentVerificationService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.loading = true;

    this.documentVerificationService.getDocumentVerification().subscribe({
      next: (data: any) => {
        this.loading = false;
        console.log('data:', data)
        data.request.forEach((verification: any) => {
          this.documentVerification.push({
            request_number: verification.request_number,
            documents_to_verify: verification.documents_to_verify,
            person: {
              full_name: verification.person.full_name,
              profile_picture: "data:image/jpeg;base64,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",//documentVerification.person.profile_picture,
              last_modified_date: new Date(verification.person.last_modified_date),
              id_user: 125 //verification.person.id_user,
            },
          });
          this.etudiants.push({
            full_name: verification.person.full_name, profile_picture: verification.person.profile_picture
          });
        })
        console.log('documentVerification:', this.documentVerification);
        console.log('documentTest:', this.documentTest);
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

  clear(table: Table) {
    this.messageService.add({ severity: 'success', summary: 'Info ✅📄🔄👍', detail: 'Tous les filtres ont été réinitialisés avec succès.' });
    table.clear();
  }

  manageRequestVerificationDocument(id_user: number, full_name: string) {
    this.router.navigate(['/manage-request-verification-document'], { queryParams: { id_user: id_user, full_name: full_name } });
  }
}