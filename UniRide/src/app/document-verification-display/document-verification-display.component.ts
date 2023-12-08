import { Component, OnInit } from '@angular/core';
import { DocumentVerificationService } from '../Services/document-verification/document-verification.service';
import { Table } from 'primeng/table';
import { tap } from 'rxjs';
import { DocumentVerification } from '../models/document-verification-display';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-document-verification-display',
  templateUrl: './document-verification-display.component.html',
  styleUrls: ['./document-verification-display.component.css']
})
export class DocumentVerificationDisplayComponent implements OnInit {

  documentVerification: DocumentVerification[] = [];
  loading: boolean = true;

  subscriptionComplete: boolean = false;
  constructor(private documentVerificationService: DocumentVerificationService) { }


  ngOnInit() {
    this.loading = false;
    this.documentVerification = [
      {
        request_number: 1,
        documents_to_verify: 5,
        person: {
          full_name: "John Doe",
          profile_picture: "url_vers_l_image_john_doe",
          last_modified_date: new Date("2023-11-29T12:45:00"),
        },
      },
      {
        request_number: 2,
        documents_to_verify: 2,
        person: {
          full_name: "Chouchane Rayan",
          profile_picture: "url_vers_l_image_rayan_chouchane",
          last_modified_date: new Date("2023-12-29T12:45:00"),
        },
      },
      // Ajoutez d'autres données de test au besoin
    ];



    this.documentVerificationService.getDocumentVerification().pipe(
      tap((data: any) => {
        console.log('data:', data)

        data.forEach((documentVerification: any) => {
          this.documentVerification.push({
            request_number: documentVerification.request_number,
            documents_to_verify: documentVerification.documents_to_verify,
            person: {
              full_name: documentVerification.person.full_name,
              profile_picture: documentVerification.person.profile_picture,
              last_modified_date: new Date(documentVerification.person.last_modified_date),
            },
          });
        }),
          console.log('documentVerification:', this.documentVerification);

      }),
    ).subscribe(() => this.subscriptionComplete = true);
  }
  customSort(event: SortEvent) {

  }
}